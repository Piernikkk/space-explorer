mod axum_error;
mod init;
mod routes;
mod state;

use color_eyre::eyre::{Context, Result};
use reqwest::Client;
use tracing::info;
use utoipa::OpenApi;

use crate::{
    init::{init_axum, init_listener, init_redis, init_tracing},
    state::AppState,
};

#[derive(OpenApi)]
#[openapi()]
struct ApiDoc;

#[tokio::main]
async fn main() -> Result<()> {
    color_eyre::install()?;

    dotenvy::dotenv().ok();

    init_tracing().wrap_err("failed to set global tracing subscriber")?;

    let redis = init_redis().await?;

    let reqwest = Client::new();

    let app_state = AppState { redis, reqwest };

    let app = init_axum(app_state).await?;
    let listener = init_listener().await?;

    info!(
        "Api started on {}",
        listener
            .local_addr()
            .wrap_err("Failed to get local app address")?,
    );

    axum::serve(listener, app.into_make_service())
        .await
        .wrap_err("Failed to run axum server")?;

    Ok(())
}
