export const config = {
  port: Number(process.env.PORT ?? 4173),
  host: process.env.HOST ?? "0.0.0.0",
  nodeEnv: process.env.NODE_ENV ?? "development",
  authSecret: process.env.AUTH_SECRET ?? "change-me",
  databaseUrl: process.env.DATABASE_URL ?? "postgresql://clm:clm@127.0.0.1:5432/clm",
  dataGovUrl: process.env.DATA_GOV_IL_URL ?? "https://data.gov.il/api/3/action/datastore_search",
  ministryResourceId:
    process.env.MINISTRY_TRANSPORT_RESOURCE_ID ?? "053cea08-09bc-40ec-8f7a-156f0677aff3",
  recallResourceId:
    process.env.MINISTRY_RECALL_RESOURCE_ID ?? "36bf1404-0be4-49d2-82dc-2f1ead4a8b93",
  lookupCacheTtlMs: Number(process.env.VEHICLE_LOOKUP_CACHE_TTL_MS ?? 86_400_000),
  vehicleDataSource: (process.env.VEHICLE_DATA_SOURCE ?? "official") as "official" | "development",
  webOrigin: process.env.WEB_ORIGIN ?? "http://127.0.0.1:5188",
  googleClientId: process.env.GOOGLE_CLIENT_ID ?? "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  googleRedirectUri:
    process.env.GOOGLE_REDIRECT_URI ?? "http://127.0.0.1:5188/api/auth/google/callback",
  enableLogs: process.env.ENABLE_LOGS === "1",
  appVersion: process.env.APP_VERSION ?? "1.0.1",
  buildSha: process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.BUILD_SHA ?? "local",
};

export function isDevelopment(): boolean {
  return config.nodeEnv !== "production";
}

export function isGoogleAuthReady(): boolean {
  return Boolean(config.googleClientId && config.googleClientSecret);
}
