use std::{collections::HashMap, env};

use axum::{Extension, Json};
use fred::{prelude::KeysInterface, types::Expiration};
use serde::{Deserialize, Deserializer, Serialize};
use utoipa::ToSchema;
use utoipa_axum::{router::OpenApiRouter, routes};

use crate::{axum_error::AxumResult, state::AppState};

pub fn routes() -> OpenApiRouter<AppState> {
    OpenApiRouter::new().routes(routes!(get_mars_weather))
}

#[derive(Debug, Deserialize, Serialize, ToSchema)]
pub struct MarsWeatherResponse {
    pub sol_keys: Vec<String>,
    #[serde(flatten, deserialize_with = "deserialize_sols")]
    pub sols: HashMap<String, SolData>,
}

fn deserialize_sols<'de, D>(deserializer: D) -> Result<HashMap<String, SolData>, D::Error>
where
    D: Deserializer<'de>,
{
    let mut map = HashMap::<String, serde_json::Value>::deserialize(deserializer)?;
    map.remove("validity_checks");

    let sols: HashMap<String, SolData> = map
        .into_iter()
        .filter_map(|(k, v)| serde_json::from_value(v).ok().map(|sol_data| (k, sol_data)))
        .collect();

    Ok(sols)
}

#[derive(Debug, Deserialize, Serialize, ToSchema)]
pub struct SolData {
    #[serde(rename = "First_UTC")]
    pub first_utc: String,
    #[serde(rename = "Last_UTC")]
    pub last_utc: String,
    #[serde(rename = "Month_ordinal")]
    pub month_ordinal: u32,
    #[serde(rename = "Northern_season")]
    pub northern_season: String,
    #[serde(rename = "Season")]
    pub season: String,
    #[serde(rename = "Southern_season")]
    pub southern_season: String,
    #[serde(rename = "AT")]
    pub at: Option<Measurement>,
    #[serde(rename = "HWS")]
    pub hws: Option<Measurement>,
    #[serde(rename = "PRE")]
    pub pre: Option<Measurement>,
    #[serde(rename = "WD")]
    pub wd: Option<WindDirection>,
}

#[derive(Debug, Deserialize, Serialize, ToSchema)]
pub struct Measurement {
    pub av: f64,
    pub ct: u32,
    pub mn: f64,
    pub mx: f64,
}

#[derive(Debug, Deserialize, Serialize, ToSchema)]
pub struct WindDirection {
    #[serde(flatten)]
    pub directions: HashMap<String, DirectionData>,
    pub most_common: DirectionData,
}

#[derive(Debug, Deserialize, Serialize, ToSchema)]
pub struct DirectionData {
    pub compass_degrees: f64,
    pub compass_point: String,
    pub compass_right: f64,
    pub compass_up: f64,
    pub ct: u32,
}

/// Get weather on mars
#[utoipa::path(
    method(get),
    path = "/",
    responses(
        (status = OK, description = "Success", body = MarsWeatherResponse, content_type = "application/json"),
    ),
    tag = "Weather"
)]
async fn get_mars_weather(
    Extension(state): Extension<AppState>,
) -> AxumResult<Json<MarsWeatherResponse>> {
    let cache: Option<String> = state.redis.get("mars_weather").await?;

    if let Some(cached_data) = cache {
        if let Ok(mars_weather) = serde_json::from_str::<MarsWeatherResponse>(&cached_data) {
            return Ok(Json(mars_weather));
        }
    }

    let mars_weather = state
        .reqwest
        .get(env::var("MARS_WEATHER_URL").unwrap())
        .query(&[
            ("feedtype", "json"),
            ("ver", "1.0"),
            ("api_key", &env::var("NASA_API_KEY").unwrap()),
        ])
        .send()
        .await?
        .json::<MarsWeatherResponse>()
        .await?;

    if let Ok(serialized) = serde_json::to_string(&mars_weather) {
        let _: () = state
            .redis
            .set(
                "mars_weather",
                serialized,
                Some(Expiration::EX(3600)),
                None,
                false,
            )
            .await?;
    }

    Ok(Json(mars_weather))
}
