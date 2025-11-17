import { paths } from "@/types/api";

export type AstrosRes =
  paths["/api/astros"]["get"]["responses"]["200"]["content"]["application/json"];

export type APODRes =
  paths["/api/apod"]["get"]["responses"]["200"]["content"]["application/json"];
