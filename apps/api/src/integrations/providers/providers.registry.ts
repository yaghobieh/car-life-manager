import { catalogWithTimestamp, type ConnectionStatus, type ProviderContext, type ServiceProviderInfo, type ServiceSource } from "@clm/shared";
import {
  CONNECTION_CONNECTED,
  CONNECTION_OFFICIAL,
  PROVIDER_CELLO,
  PROVIDER_EASYPARK,
  PROVIDER_HIGHWAY_6,
  PROVIDER_HIGHWAY_6_NORTH,
  PROVIDER_IDENTITY,
  PROVIDER_INSURANCE,
  PROVIDER_PANGO,
} from "./providers.const";
import { hubAwareAdapter, unsupportedAdapter } from "./providers.adapter";
import type { ProviderAdapter, StoredProviderConnection } from "./providers.types";

const ADAPTERS: Record<string, ProviderAdapter> = {
  [PROVIDER_PANGO]: hubAwareAdapter(PROVIDER_PANGO),
  [PROVIDER_CELLO]: hubAwareAdapter(PROVIDER_CELLO),
  [PROVIDER_HIGHWAY_6]: hubAwareAdapter(PROVIDER_HIGHWAY_6),
  [PROVIDER_HIGHWAY_6_NORTH]: hubAwareAdapter(PROVIDER_HIGHWAY_6_NORTH),
  [PROVIDER_EASYPARK]: hubAwareAdapter(PROVIDER_EASYPARK),
  [PROVIDER_INSURANCE]: hubAwareAdapter(PROVIDER_INSURANCE),
  [PROVIDER_IDENTITY]: unsupportedAdapter(PROVIDER_IDENTITY),
};

export function getProviderAdapter(providerId: string): ProviderAdapter {
  return ADAPTERS[providerId] ?? unsupportedAdapter(providerId);
}

export async function listReadyServices(
  context: ProviderContext,
  stored: StoredProviderConnection[] = [],
): Promise<ServiceProviderInfo[]> {
  const storedById = new Map(stored.map((row) => [row.providerId, row]));
  const catalog = catalogWithTimestamp();

  return Promise.all(
    catalog.map(async (provider) => {
      const adapter = getProviderAdapter(provider.providerId);
      const live = await adapter.getConnectionStatus(context);
      const saved = storedById.get(provider.providerId);
      const official = provider.status === CONNECTION_OFFICIAL;
      const hubConnected = live === CONNECTION_CONNECTED;
      const status = official
        ? CONNECTION_OFFICIAL
        : hubConnected
          ? live
          : userStoredStatus(saved?.status, live);
      return {
        ...provider,
        status,
        note: saved?.note ?? provider.note,
        lastCheckedAt: new Date().toISOString(),
        source: official ? "official" : hubConnected ? "provider" : serviceSource(saved?.source, provider.source),
        confirmedByUserAt: saved?.confirmedByUserAt ?? null,
      };
    }),
  );
}

function userStoredStatus(status: string | undefined, fallback: ConnectionStatus): ConnectionStatus {
  if (status === "user_confirmed" || status === "not_connected" || status === "unknown") return status;
  return fallback;
}

function serviceSource(status: string | undefined, fallback: ServiceSource): ServiceSource {
  if (status === "official" || status === "user" || status === "provider" || status === "unknown" || status === "calculated" || status === "document") {
    return status;
  }
  return fallback;
}

