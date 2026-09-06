export interface MinistryVehicleRecord {
  mispar_rechev?: number | string;
  tozeret_nm?: string;
  kinuy_mishari?: string;
  shnat_yitzur?: number | string;
  delek_nm?: string;
  tokef_dt?: string;
  mivchan_acharon_dt?: string;
  baalut?: string;
  tzeva_rechev?: string;
  moed_aliya_lakvish?: string;
  degem_nm?: string;
}

export interface MinistrySearchResponse {
  success?: boolean;
  result?: {
    records?: MinistryVehicleRecord[];
    total?: number;
  };
  error?: { message?: string };
}
