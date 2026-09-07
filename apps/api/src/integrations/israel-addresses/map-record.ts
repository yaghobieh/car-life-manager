import type { AreaPrice, OfficialAddress } from "@clm/shared";
import { ADDRESS_KIND_CITY, ADDRESS_KIND_STREET, ADDRESS_SOURCE_OFFICIAL } from "./addresses.const";
import type { HousingLotteryRecord, IsraelCityRecord, IsraelStreetRecord } from "./types";

function text(value: string | number | undefined): string | null {
  if (value === undefined || value === null) return null;
  const next = String(value).trim();
  return next ? next : null;
}

export function mapCityRecord(record: IsraelCityRecord): OfficialAddress | null {
  const city = text(record.city_name_he) ?? text(record.city_name_en);
  const cityCode = text(record.city_code);
  if (!city || !cityCode) return null;
  return {
    id: `city-${cityCode}`,
    kind: ADDRESS_KIND_CITY,
    city,
    street: null,
    cityCode,
    streetCode: null,
    region: text(record.region_name),
    source: ADDRESS_SOURCE_OFFICIAL,
  };
}

export function mapStreetRecord(record: IsraelStreetRecord): OfficialAddress | null {
  const city = text(record.city_name);
  const street = text(record.street_name);
  const cityCode = text(record.city_code);
  const streetCode = text(record.street_code);
  if (!city || !street || !cityCode || !streetCode) return null;
  return {
    id: `street-${cityCode}-${streetCode}`,
    kind: ADDRESS_KIND_STREET,
    city,
    street,
    cityCode,
    streetCode,
    region: text(record.region_name),
    source: ADDRESS_SOURCE_OFFICIAL,
  };
}

export function mapLotteryRecord(record: HousingLotteryRecord): AreaPrice | null {
  const city = text(record.LamasName);
  if (!city) return null;
  return {
    id: `lottery-${record._id ?? city}`,
    city,
    neighborhood: text(record.Neighborhood),
    projectName: text(record.ProjectName),
    pricePerMeter: text(record.PriceForMeter),
    source: ADDRESS_SOURCE_OFFICIAL,
  };
}
