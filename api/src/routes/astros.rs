use std::env;

use axum::{Extension, Json};
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use utoipa_axum::{router::OpenApiRouter, routes};

use crate::{axum_error::AxumResult, state::AppState};

pub fn routes() -> OpenApiRouter<AppState> {
    OpenApiRouter::new().routes(routes!(get_astros))
}

#[derive(Deserialize, ToSchema, Clone, Serialize)]
pub struct Astros {
    name: String,
    craft: String,
}

#[derive(Deserialize, ToSchema, Clone, Serialize)]
pub struct ApiRes {
    people: Vec<Astros>,
    message: String,
    number: u32,
}

/// Get user details
#[utoipa::path(
    method(get),
    path = "/",
    responses(
        (status = OK, description = "Success", body = ApiRes, content_type = "application/json"),
    ),
    tag = "Auth"
)]
async fn get_astros(Extension(state): Extension<AppState>) -> AxumResult<Json<ApiRes>> {
    let astros = state
        .reqwest
        .get(env::var("ASTRO_URL").unwrap())
        .send()
        .await?
        .json::<ApiRes>()
        .await?;

    Ok(Json(astros))
}
