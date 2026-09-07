export interface IsraelCityRecord {
  city_code?: number | string;
  city_name_he?: string;
  city_name_en?: string;
  region_name?: string;
}

export interface IsraelStreetRecord {
  city_code?: number | string;
  city_name?: string;
  street_code?: string | number;
  street_name?: string;
  region_name?: string;
  street_name_status?: string;
}

export interface DatastoreSearchResponse<T> {
  success?: boolean;
  result?: {
    records?: T[];
    total?: number;
  };
  error?: { message?: string };
}
