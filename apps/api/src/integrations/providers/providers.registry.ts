import { catalogWithTimestamp, type ProviderContext, type ServiceProviderInfo } from "@clm/shared";
import {
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
      return {
        ...provider,
        status: provider.status === CONNECTION_OFFICIAL ? CONNECTION_OFFICIAL : live,
        note: saved?.note ?? provider.note,
        lastCheckedAt: new Date().toISOString(),
      };
    }),
  );
}

