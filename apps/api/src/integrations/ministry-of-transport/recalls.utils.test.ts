import { describe, expect, it } from "vitest";
import { mapRecallRecord } from "./recalls.utils";

describe("mapRecallRecord", () => {
  it("maps official MOT recall fields and keeps the real campaign id", () => {
    const recall = mapRecallRecord({
      MISPAR_RECHEV: 1000632,
      RECALL_ID: 15781,
      SUG_RECALL: "תקלה סידרתית בטיחותית",
      SUG_TAKALA: "חשמל אליקטרוניקה ומיזוג",
      TEUR_TAKALA: "נוזל הבלמים",
      TAARICH_PTICHA: "2024-12-03",
    });
    expect(recall).toEqual({
      recallId: "15781",
      kind: "תקלה סידרתית בטיחותית",
      faultKind: "חשמל אליקטרוניקה ומיזוג",
      description: "נוזל הבלמים",
      openedAt: "2024-12-03",
    });
  });

  it("drops records without an official recall id", () => {
    expect(mapRecallRecord({ SUG_TAKALA: "מנוע" })).toBeNull();
  });
});
