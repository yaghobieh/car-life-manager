import type { Home, HomeDealType, Lawyer, PropertyExpense, SavedAddress } from "@clm/shared";
import type {
  Home as HomeRow,
  Lawyer as LawyerRow,
  PropertyExpense as PropertyExpenseRow,
  SavedAddress as SavedAddressRow,
} from "@prisma/client";
import { PROPERTY_SOURCE_OFFICIAL, PROPERTY_SOURCE_USER } from "./property.const";

function parseList(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

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

export function serializeHome(row: HomeRow): Home {
  return {
    id: row.id,
    userId: row.userId,
    dealType: row.dealType as HomeDealType,
    city: row.city,
    street: row.street,
    houseNumber: row.houseNumber,
    neighborhood: row.neighborhood,
    rooms: row.rooms,
    sqm: row.sqm,
    floor: row.floor,
    price: row.price,
    currency: "ILS",
    features: parseList(row.features),
    imageUrls: parseList(row.imageUrls),
    model3dUrl: row.model3dUrl,
    nextDueDate: row.nextDueDate,
    nextDueTitle: row.nextDueTitle,
    notes: row.notes,
    source: PROPERTY_SOURCE_USER,
    createdAt: row.createdAt.toISOString(),
  };
}

export function serializePropertyExpense(row: PropertyExpenseRow): PropertyExpense {
  return {
    id: row.id,
    userId: row.userId,
    category: row.category,
    amount: row.amount,
    currency: "ILS",
    occurredAt: row.occurredAt.toISOString(),
    description: row.description,
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
