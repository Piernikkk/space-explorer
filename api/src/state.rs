use fred::prelude::Pool;
use reqwest::Client;

#[derive(Clone)]
pub struct AppState {
    pub redis: Pool,
    pub reqwest: Client,
}
