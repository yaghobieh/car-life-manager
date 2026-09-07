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
  citiesResourceId:
    process.env.ISRAEL_CITIES_RESOURCE_ID ?? "8f714b6f-c35c-4b40-a0e7-547b675eee0e",
  streetsResourceId:
    process.env.ISRAEL_STREETS_RESOURCE_ID ?? "bf185c7f-1a4e-4662-88c5-fa118a244bda",
  lookupCacheTtlMs: Number(process.env.VEHICLE_LOOKUP_CACHE_TTL_MS ?? 86_400_000),
  vehicleDataSource: (process.env.VEHICLE_DATA_SOURCE ?? "official") as "official" | "development",
  webOrigin: process.env.WEB_ORIGIN ?? "http://127.0.0.1:5188",
  googleClientId: process.env.GOOGLE_CLIENT_ID ?? "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  googleRedirectUri:
    process.env.GOOGLE_REDIRECT_URI ?? "http://127.0.0.1:5188/api/auth/google/callback",
  auth0Domain: process.env.AUTH0_DOMAIN ?? "",
  auth0ClientId: process.env.AUTH0_CLIENT_ID ?? "",
  auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET ?? "",
  auth0Audience: process.env.AUTH0_AUDIENCE ?? "",
  auth0RedirectUri:
    process.env.AUTH0_CALLBACK_URL ?? "http://127.0.0.1:5188/api/auth/auth0/callback",
  enableLogs: process.env.ENABLE_LOGS === "1",
  appVersion: process.env.APP_VERSION ?? "1.0.2",
  buildSha: process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.BUILD_SHA ?? "local",
  providerHubUrl: process.env.PROVIDER_HUB_URL ?? "",
  providerHubKey: process.env.PROVIDER_HUB_KEY ?? "",
  pangoApiUrl: process.env.PANGO_API_URL ?? "",
  celloApiUrl: process.env.CELLO_API_URL ?? "",
  highway6ApiUrl: process.env.HIGHWAY6_API_URL ?? "",
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  notifyFromEmail: process.env.NOTIFY_FROM_EMAIL ?? "Car Life Manager <noreply@carlifemanager.app>",
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID ?? "",
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN ?? "",
  twilioFromNumber: process.env.TWILIO_FROM_NUMBER ?? "",
};

export function isDevelopment(): boolean {
  return config.nodeEnv !== "production";
}

export function isGoogleAuthReady(): boolean {
  return Boolean(config.googleClientId && config.googleClientSecret);
}

export function isAuth0Ready(): boolean {
  return Boolean(config.auth0Domain && config.auth0ClientId && config.auth0ClientSecret);
}

export function isEmailNotifyReady(): boolean {
  return Boolean(config.resendApiKey);
}

export function isSmsNotifyReady(): boolean {
  return Boolean(config.twilioAccountSid && config.twilioAuthToken && config.twilioFromNumber);
}
