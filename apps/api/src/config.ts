export const config = {
  port: Number(process.env.PORT ?? 4173),
  host: process.env.HOST ?? "0.0.0.0",
  nodeEnv: process.env.NODE_ENV ?? "development",
  authSecret: process.env.AUTH_SECRET ?? "change-me",
  databaseUrl: process.env.DATABASE_URL ?? "file:./dev.db",
  dataGovUrl: process.env.DATA_GOV_IL_URL ?? "https://data.gov.il/api/3/action/datastore_search",
  ministryResourceId:
    process.env.MINISTRY_TRANSPORT_RESOURCE_ID ?? "053cea08-09bc-40ec-8f7a-156f0677aff3",
  lookupCacheTtlMs: Number(process.env.VEHICLE_LOOKUP_CACHE_TTL_MS ?? 86_400_000),
  vehicleDataSource: (process.env.VEHICLE_DATA_SOURCE ?? "official") as "official" | "development",
};

export function isDevelopment(): boolean {
  return config.nodeEnv !== "production";
}
