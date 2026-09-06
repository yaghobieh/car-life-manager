import {
  formatRegistrationNumber,
  normalizeRegistrationNumber,
  type VehicleLookupResult,
} from "@clm/shared";
import type { MinistryVehicleRecord } from "./types";

function text(value: string | number | undefined): string | null {
  if (value === undefined || value === null || value === "") return null;
  return String(value);
}

function year(value: string | number | undefined): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 1900 ? parsed : null;
}

function isoDate(value: string | undefined): string | null {
  if (!value) return null;
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return null;
  return new Date(parsed).toISOString();
}

function addYear(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  date.setFullYear(date.getFullYear() + 1);
  return date.toISOString();
}

export function mapMinistryRecord(record: MinistryVehicleRecord): VehicleLookupResult {
  const plate = normalizeRegistrationNumber(String(record.mispar_rechev ?? ""));
  const lastTest = isoDate(record.mivchan_acharon_dt);
  return {
    rawAvailable: true,
    vehicle: {
      registrationNumber: plate,
      formattedRegistrationNumber: formatRegistrationNumber(plate),
      make: text(record.tozeret_nm),
      model: text(record.kinuy_mishari) ?? text(record.degem_nm),
      modelYear: year(record.shnat_yitzur),
      fuelType: text(record.delek_nm),
      engine: null,
      color: text(record.tzeva_rechev),
      registrationDate: isoDate(record.moed_aliya_lakvish),
      registrationExpiry: isoDate(record.tokef_dt),
      lastTestDate: lastTest,
      nextTestDate: addYear(lastTest),
      ownershipSequence: null,
      ownershipType: text(record.baalut),
      mileage: null,
      dataSource: "משרד התחבורה / data.gov.il",
      dataProvenance: "official",
      dataSourceUpdatedAt: new Date().toISOString(),
    },
  };
}
