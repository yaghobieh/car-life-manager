import type { OfficialAddress } from "@clm/shared";
import { config } from "../../config";
import {
  ACCEPT_JSON,
  ADDRESS_SEARCH_LIMIT,
  DATASTORE_TIMEOUT_MS,
} from "./addresses.const";
import { mapCityRecord, mapStreetRecord } from "./map-record";
import type { DatastoreSearchResponse, IsraelCityRecord, IsraelStreetRecord } from "./types";

export class IsraelAddressError extends Error {
  constructor(
    message: string,
    readonly code: "timeout" | "unavailable" | "malformed" | "rate_limit",
  ) {
    super(message);
    this.name = "IsraelAddressError";
  }
}

async function datastoreSearch<T>(resourceId: string, query: string): Promise<T[]> {
  const url = new URL(config.dataGovUrl);
  url.searchParams.set("resource_id", resourceId);
  url.searchParams.set("q", query);
  url.searchParams.set("limit", ADDRESS_SEARCH_LIMIT);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DATASTORE_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: ACCEPT_JSON },
    });
    if (response.status === 429) {
      throw new IsraelAddressError("data.gov.il rate limited the request", "rate_limit");
    }
    if (!response.ok) {
      throw new IsraelAddressError(`data.gov.il returned ${response.status}`, "unavailable");
    }
    const body = (await response.json()) as DatastoreSearchResponse<T>;
    if (!body.success) {
      throw new IsraelAddressError(body.error?.message ?? "Lookup failed", "unavailable");
    }
    return body.result?.records ?? [];
  } catch (error) {
    if (error instanceof IsraelAddressError) throw error;
    if (error instanceof Error && error.name === "AbortError") {
      throw new IsraelAddressError("data.gov.il timed out", "timeout");
    }
    throw new IsraelAddressError("Malformed or unreachable data.gov.il response", "malformed");
  } finally {
    clearTimeout(timer);
  }
}

export async function searchOfficialAddresses(query: string): Promise<OfficialAddress[]> {
  const [cities, streets] = await Promise.all([
    datastoreSearch<IsraelCityRecord>(config.citiesResourceId, query),
    datastoreSearch<IsraelStreetRecord>(config.streetsResourceId, query),
  ]);

  const mappedCities = cities.map(mapCityRecord).filter((item): item is OfficialAddress => Boolean(item));
  const mappedStreets = streets.map(mapStreetRecord).filter((item): item is OfficialAddress => Boolean(item));
  const seen = new Set<string>();
  const merged: OfficialAddress[] = [];
  for (const item of [...mappedStreets, ...mappedCities]) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    merged.push(item);
  }
  return merged;
}
