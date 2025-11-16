use std::env;

use axum::{Extension, Json};
use fred::{prelude::KeysInterface, types::Expiration};
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use utoipa_axum::{router::OpenApiRouter, routes};

use crate::{axum_error::AxumResult, state::AppState};

pub fn routes() -> OpenApiRouter<AppState> {
    OpenApiRouter::new().routes(routes!(get_apod))
}

#[derive(Deserialize, ToSchema, Clone, Serialize)]
struct Res {
    explanation: String,
    hdurl: String,
    title: String,
}

/// Get astronomy picture of the day
#[utoipa::path(
    method(get),
    path = "/",
    responses(
        (status = OK, description = "Success", body = Res, content_type = "application/json"),
    ),
    tag = "Images"
)]
async fn get_apod(Extension(state): Extension<AppState>) -> AxumResult<Json<Res>> {
    let cache: Option<String> = state.redis.get("apod").await?;

    if let Some(cached_data) = cache {
        if let Ok(apod) = serde_json::from_str::<Res>(&cached_data) {
            return Ok(Json(apod));
        }
    }

    let apod = state
        .reqwest
        .get(env::var("APOD_URL").unwrap())
        .query(&[
            ("thumbs", "true"),
            ("api_key", &env::var("NASA_API_KEY").unwrap()),
        ])
        .send()
        .await?
        .json::<Res>()
        .await?;

    if let Ok(serialized) = serde_json::to_string(&apod) {
        let _: () = state
            .redis
            .set("apod", serialized, Some(Expiration::EX(3600)), None, false)
            .await?;
    }

    Ok(Json(apod))
}
