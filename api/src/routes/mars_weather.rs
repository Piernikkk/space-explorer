/// Get weather on mars
#[utoipa::path(
    method(get),
    path = "/",
    responses(
        (status = OK, description = "Success", body = Res, content_type = "application/json"),
    ),
    tag = "Weather"
)]
async fn get_apod(Extension(state): Extension<AppState>) -> AxumResult<Json<Res>> {}
