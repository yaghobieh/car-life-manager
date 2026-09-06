import { EMPTY_CAPABILITIES, type ConnectionStatus } from "@clm/shared";
import { CONNECTION_NOT_SUPPORTED, UNSUPPORTED_NOTE } from "./providers.const";
import type { ProviderAdapter } from "./providers.types";

export function unsupportedAdapter(id: string): ProviderAdapter {
  return {
    id,
    capabilities: () => EMPTY_CAPABILITIES,
    async getConnectionStatus() {
      return CONNECTION_NOT_SUPPORTED as ConnectionStatus;
    },
    async connect() {
      return {
        status: CONNECTION_NOT_SUPPORTED as ConnectionStatus,
        note: UNSUPPORTED_NOTE,
      };
    },
  };
}
