use fred::prelude::Pool;

#[derive(Clone)]
pub struct AppState {
    pub redis: Pool,
}
