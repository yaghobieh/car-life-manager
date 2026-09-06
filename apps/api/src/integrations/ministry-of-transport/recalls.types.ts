export interface MinistryRecallRecord {
  MISPAR_RECHEV?: number | string;
  RECALL_ID?: number | string;
  SUG_RECALL?: string;
  SUG_TAKALA?: string;
  TEUR_TAKALA?: string;
  TAARICH_PTICHA?: string;
}

export interface MinistryRecallSearchResponse {
  success?: boolean;
  result?: {
    records?: MinistryRecallRecord[];
  };
  error?: { message?: string };
}
