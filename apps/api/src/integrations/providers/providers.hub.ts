import { config } from "../../config";
import {
  CONNECTION_CONNECTED,
  CONNECTION_NOT_SUPPORTED,
  HUB_STATUS_PATH,
  HUB_TIMEOUT_MS,
  PROVIDER_CELLO,
  PROVIDER_HIGHWAY_6,
  PROVIDER_PANGO,
} from "./providers.const";
import type { ConnectionStatus } from "@clm/shared";

function providerDirectUrl(providerId: string): string {
  if (providerId === PROVIDER_PANGO) return config.pangoApiUrl;
  if (providerId === PROVIDER_CELLO) return config.celloApiUrl;
  if (providerId === PROVIDER_HIGHWAY_6) return config.highway6ApiUrl;
  return "";
}

function probeUrl(providerId: string): string {
  if (config.providerHubUrl) {
    return `${config.providerHubUrl.replace(/\/$/, "")}${HUB_STATUS_PATH}/${providerId}`;
  }
  return providerDirectUrl(providerId);
}

function isVerifiedConnection(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const row = body as { verified?: unknown; status?: unknown };
  return row.verified === true && row.status === CONNECTION_CONNECTED;
}

export async function probeProviderHub(providerId: string): Promise<ConnectionStatus> {
  const url = probeUrl(providerId);
  if (!url) return CONNECTION_NOT_SUPPORTED;

  try {
    const headers: Record<string, string> = { Accept: "application/json" };
    if (config.providerHubKey) headers.Authorization = `Bearer ${config.providerHubKey}`;
    const response = await fetch(url, {
      headers,
      signal: AbortSignal.timeout(HUB_TIMEOUT_MS),
    });
    if (!response.ok) return CONNECTION_NOT_SUPPORTED;
    const body: unknown = await response.json();
    return isVerifiedConnection(body) ? CONNECTION_CONNECTED : CONNECTION_NOT_SUPPORTED;
  } catch {
    return CONNECTION_NOT_SUPPORTED;
  }
}
