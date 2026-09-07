import type { Lawyer, SavedAddress } from "@clm/shared";
import type { Lawyer as LawyerRow, SavedAddress as SavedAddressRow } from "@prisma/client";
import { PROPERTY_SOURCE_OFFICIAL, PROPERTY_SOURCE_USER } from "./property.const";

export function serializeLawyer(row: LawyerRow): Lawyer {
  return {
    id: row.id,
    userId: row.userId,
    name: row.name,
    city: row.city,
    specialty: row.specialty,
    phone: row.phone,
    notes: row.notes,
    source: PROPERTY_SOURCE_USER,
    createdAt: row.createdAt.toISOString(),
  };
}

export function serializeSavedAddress(row: SavedAddressRow): SavedAddress {
  return {
    id: row.id,
    userId: row.userId,
    city: row.city,
    street: row.street,
    cityCode: row.cityCode,
    streetCode: row.streetCode,
    region: row.region,
    source: PROPERTY_SOURCE_OFFICIAL,
    createdAt: row.createdAt.toISOString(),
  };
}
