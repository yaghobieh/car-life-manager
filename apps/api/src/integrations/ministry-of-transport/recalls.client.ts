import { registrationLookupKey, type VehicleRecall } from "@clm/shared";
import { logger } from "../../logger";
import { config } from "../../config";
import {
  ACCEPT_JSON,
  DATASTORE_RECALL_LIMIT,
  DATASTORE_TIMEOUT_MS,
  RECALL_FILTER_PLATE,
} from "./ministry.const";
import type { MinistryRecallSearchResponse } from "./recalls.types";
import { mapRecallRecord } from "./recalls.utils";

export async function fetchOutstandingRecalls(registrationNumber: string): Promise<VehicleRecall[]> {
  const plate = registrationLookupKey(registrationNumber);
  const url = new URL(config.dataGovUrl);
  url.searchParams.set("resource_id", config.recallResourceId);
  url.searchParams.set("filters", JSON.stringify({ [RECALL_FILTER_PLATE]: plate }));
  url.searchParams.set("limit", DATASTORE_RECALL_LIMIT);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DATASTORE_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: ACCEPT_JSON },
    });
    if (!response.ok) {
      logger.warn("recall lookup failed", response.status);
      return [];
    }
    const body = (await response.json()) as MinistryRecallSearchResponse;
    if (!body.success) {
      logger.warn("recall lookup rejected", body.error?.message);
      return [];
    }
    return (body.result?.records ?? [])
      .map(mapRecallRecord)
      .filter((item): item is VehicleRecall => Boolean(item));
  } catch (error) {
    logger.warn("recall lookup error", error instanceof Error ? error.message : error);
    return [];
  } finally {
    clearTimeout(timer);
  }
}
