mod apod;
mod astros;
mod health;

use utoipa::OpenApi;
use utoipa_axum::router::OpenApiRouter;

use crate::{ApiDoc, state::AppState};

pub fn routes() -> OpenApiRouter<AppState> {
    let api = OpenApiRouter::with_openapi(ApiDoc::openapi())
        .nest("/health", health::routes())
        .nest("/astros", astros::routes())
        .nest("/apod", apod::routes());

    OpenApiRouter::with_openapi(ApiDoc::openapi()).nest("/api", api)
}
