import { EMPTY_CAPABILITIES, type ConnectionStatus, type ProviderCapabilities } from "@clm/shared";
import type { ProviderContext } from "@clm/shared";

export interface ProviderAdapter {
  id: string;
  capabilities(): ProviderCapabilities;
  lookup?(input: unknown): Promise<unknown>;
  getConnectionStatus?(context: ProviderContext): Promise<ConnectionStatus>;
  connect?(context: ProviderContext): Promise<{ status: ConnectionStatus; note: string }>;
  disconnect?(context: ProviderContext): Promise<void>;
}

export function unsupportedAdapter(id: string): ProviderAdapter {
  return {
    id,
    capabilities: () => EMPTY_CAPABILITIES,
    async getConnectionStatus() {
      return "not_supported";
    },
    async connect() {
      return {
        status: "not_supported",
        note: "No official authenticated API is configured for this provider.",
      };
    },
  };
}

export const pangoAdapter = unsupportedAdapter("pango");
export const celloAdapter = unsupportedAdapter("cello");
export const highway6Adapter = unsupportedAdapter("highway-6");
