import type { VehicleRecall } from "@clm/shared";
import type { MinistryRecallRecord } from "./recalls.types";

function text(value: string | number | undefined): string | null {
  if (value === undefined || value === null || value === "") return null;
  return String(value);
}

export function mapRecallRecord(record: MinistryRecallRecord): VehicleRecall | null {
  const recallId = text(record.RECALL_ID);
  if (!recallId) return null;
  return {
    recallId,
    kind: text(record.SUG_RECALL),
    faultKind: text(record.SUG_TAKALA),
    description: text(record.TEUR_TAKALA),
    openedAt: text(record.TAARICH_PTICHA),
  };
}
