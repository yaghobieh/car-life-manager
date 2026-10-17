import type { ConnectionStatus, ProviderCapabilities, ServiceProviderInfo, ServiceSource } from "./types";

function catalogItem(
  provider: Omit<ServiceProviderInfo, "lastCheckedAt" | "source" | "confirmedByUserAt"> & {
    source?: ServiceSource;
  },
): Omit<ServiceProviderInfo, "lastCheckedAt"> {
  const official = provider.status === "official";
  return {
    ...provider,
    source: provider.source ?? (official ? "official" : "unknown"),
    confirmedByUserAt: null,
  };
}

export const CATALOG_PROVIDERS: Array<Omit<ServiceProviderInfo, "lastCheckedAt">> = [
  catalogItem({
    providerId: "ministry-of-transport",
    name: "משרד התחבורה",
    category: "other",
    officialUrl: "https://data.gov.il/dataset/private-and-commercial-vehicles",
    status: "official",
    note: "רישוי רשמי לפי מספר רכב מ-data.gov.il.",
  }),
  catalogItem({
    providerId: "ministry-recalls",
    name: "קריאות לתיקון",
    category: "other",
    officialUrl: "https://data.gov.il/dataset/hagbalat_recall",
    status: "official",
    note: "קריאות תיקון פתוחות לפי לוחית מ-data.gov.il.",
  }),
  catalogItem({
    providerId: "highway-6",
    name: "כביש 6",
    category: "toll",
    officialUrl: "https://www.kvish6.co.il",
    status: "not_supported",
    note: "אין API רשמי ציבורי לבדיקת חיבור רכב. נדרש שיתוף פעולה עם המפעיל.",
  }),
  catalogItem({
    providerId: "highway-6-north",
    name: "כביש 6 צפון",
    category: "toll",
    officialUrl: "https://www.kvish6.co.il",
    status: "not_supported",
    note: "אין אינטגרציה מאומתת.",
  }),
  catalogItem({
    providerId: "pango",
    name: "Pango",
    category: "parking",
    officialUrl: "https://www.pango.co.il",
    status: "not_supported",
    note: "אין OAuth או API ציבורי לחיבור חשבון. אפשר לפתוח את האתר הרשמי.",
  }),
  catalogItem({
    providerId: "cello",
    name: "Cello",
    category: "parking",
    officialUrl: "https://www.cello.co.il",
    status: "not_supported",
    note: "אין אינטגרציה מאומתת לחשבון משתמש.",
  }),
  catalogItem({
    providerId: "easypark",
    name: "EasyPark",
    category: "parking",
    officialUrl: "https://easypark.co.il",
    status: "not_supported",
    note: "אין אינטגרציה מאומתת.",
  }),
  catalogItem({
    providerId: "mandatory-insurance",
    name: "ביטוח חובה",
    category: "insurance",
    officialUrl: "https://www.gov.il/he/departments/capital_market_authority",
    status: "not_supported",
    note: "אין חיבור רשמי לחברות ביטוח. הזן פוליסה ידנית כשתהיה זמינה.",
  }),
];

export const EMPTY_CAPABILITIES: ProviderCapabilities = {
  lookup: false,
  connectionStatus: false,
  connect: false,
  vehicleScoped: false,
};

export function catalogWithTimestamp(statusOverride?: ConnectionStatus): ServiceProviderInfo[] {
  const checkedAt = new Date().toISOString();
  return CATALOG_PROVIDERS.map((provider) => ({
    ...provider,
    status: statusOverride ?? provider.status,
    lastCheckedAt: checkedAt,
  }));
}
