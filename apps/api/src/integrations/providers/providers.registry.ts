import { catalogWithTimestamp, type ProviderContext, type ServiceProviderInfo } from "@clm/shared";
import {
  PROVIDER_CELLO,
  PROVIDER_EASYPARK,
  PROVIDER_HIGHWAY_6,
  PROVIDER_HIGHWAY_6_NORTH,
  PROVIDER_IDENTITY,
  PROVIDER_INSURANCE,
  PROVIDER_PANGO,
} from "./providers.const";
import { unsupportedAdapter } from "./providers.adapter";
import type { ProviderAdapter, StoredProviderConnection } from "./providers.types";

const ADAPTERS: Record<string, ProviderAdapter> = {
  [PROVIDER_PANGO]: unsupportedAdapter(PROVIDER_PANGO),
  [PROVIDER_CELLO]: unsupportedAdapter(PROVIDER_CELLO),
  [PROVIDER_HIGHWAY_6]: unsupportedAdapter(PROVIDER_HIGHWAY_6),
  [PROVIDER_HIGHWAY_6_NORTH]: unsupportedAdapter(PROVIDER_HIGHWAY_6_NORTH),
  [PROVIDER_EASYPARK]: unsupportedAdapter(PROVIDER_EASYPARK),
  [PROVIDER_INSURANCE]: unsupportedAdapter(PROVIDER_INSURANCE),
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
        status: live,
        note: saved?.note ?? provider.note,
        lastCheckedAt: new Date().toISOString(),
      };
    }),
  );
}

