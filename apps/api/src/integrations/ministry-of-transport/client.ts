import { registrationLookupKey } from "@clm/shared";
import { config } from "../../config";
import { mapMinistryRecord } from "./map-record";
import type { MinistrySearchResponse } from "./types";
import type { VehicleLookupResult } from "@clm/shared";

export class MinistryTransportError extends Error {
  constructor(
    message: string,
    readonly code:
      | "timeout"
      | "unavailable"
      | "malformed"
      | "not_found"
      | "rate_limit",
  ) {
    super(message);
    this.name = "MinistryTransportError";
  }
}

export async function lookupOfficialVehicle(registrationNumber: string): Promise<VehicleLookupResult> {
  const plate = registrationLookupKey(registrationNumber);
  const url = new URL(config.dataGovUrl);
  url.searchParams.set("resource_id", config.ministryResourceId);
  url.searchParams.set("filters", JSON.stringify({ mispar_rechev: plate }));
  url.searchParams.set("limit", "1");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12_000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });

    if (response.status === 429) {
      throw new MinistryTransportError("data.gov.il rate limited the request", "rate_limit");
    }
    if (!response.ok) {
      throw new MinistryTransportError(`data.gov.il returned ${response.status}`, "unavailable");
    }

    const body = (await response.json()) as MinistrySearchResponse;
    if (!body.success) {
      throw new MinistryTransportError(body.error?.message ?? "Lookup failed", "unavailable");
    }
    const record = body.result?.records?.[0];
    if (!record) {
      throw new MinistryTransportError("Vehicle not found in the public registry", "not_found");
    }
    return mapMinistryRecord(record);
  } catch (error) {
    if (error instanceof MinistryTransportError) throw error;
    if (error instanceof Error && error.name === "AbortError") {
      throw new MinistryTransportError("data.gov.il timed out", "timeout");
    }
    throw new MinistryTransportError("Malformed or unreachable data.gov.il response", "malformed");
  } finally {
    clearTimeout(timer);
  }
}
