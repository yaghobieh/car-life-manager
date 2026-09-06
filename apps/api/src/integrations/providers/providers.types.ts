import type { ConnectionStatus, ProviderCapabilities, ProviderContext } from "@clm/shared";

export interface ProviderAdapter {
  id: string;
  capabilities(): ProviderCapabilities;
  getConnectionStatus(context: ProviderContext): Promise<ConnectionStatus>;
  connect(context: ProviderContext): Promise<{ status: ConnectionStatus; note: string }>;
}

export interface StoredProviderConnection {
  providerId: string;
  status: string;
  note: string | null;
  source?: string;
  confirmedByUserAt?: string | null;
}
