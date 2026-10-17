import type {
  AreaPrice,
  Home,
  HomeInput,
  Lawyer,
  LawyerInput,
  OfficialAddress,
  PropertyExpense,
  PropertyExpenseInput,
  SavedAddress,
  SavedAddressInput,
} from "@clm/shared";
import { HTTP_BAD_GATEWAY, HTTP_BAD_REQUEST, HTTP_TOO_MANY_REQUESTS } from "../../constants/http.const";
import { prisma } from "../../db";
import { HttpError } from "../../errors/http-error";
import {
  IsraelAddressError,
  searchOfficialAddresses,
  searchOfficialAreaPrices,
} from "../../integrations/israel-addresses/client";
import { QUERY_MIN_LENGTH } from "../../integrations/israel-addresses/addresses.const";
import { isValidPhone, normalizePhone } from "../auth/auth.utils";
import {
  ADDRESS_CITY_REQUIRED_CODE,
  HOME_DEAL_TYPES,
  INVALID_PHONE_CODE,
  LAWYER_NAME_MIN,
  LAWYER_NAME_REQUIRED_CODE,
  NOTES_MAX_LENGTH,
  PROPERTY_SOURCE_OFFICIAL,
  PROPERTY_SOURCE_USER,
  QUERY_TOO_SHORT_CODE,
} from "./property.const";
import { serializeHome, serializeLawyer, serializePropertyExpense, serializeSavedAddress } from "./serialize";

function optionalText(value: string | null | undefined, max = NOTES_MAX_LENGTH): string | null {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

export async function searchAddresses(query: string): Promise<OfficialAddress[]> {
  const trimmed = query.trim();
  if (trimmed.length < QUERY_MIN_LENGTH) {
    throw new HttpError("Search query is too short", HTTP_BAD_REQUEST, QUERY_TOO_SHORT_CODE);
  }
  try {
    return await searchOfficialAddresses(trimmed);
  } catch (error) {
    if (error instanceof IsraelAddressError && error.code === "rate_limit") {
      throw Object.assign(new Error(error.message), { status: HTTP_TOO_MANY_REQUESTS, code: error.code });
    }
    throw Object.assign(
      new Error(error instanceof Error ? error.message : "Address lookup unavailable"),
      { status: HTTP_BAD_GATEWAY, code: error instanceof IsraelAddressError ? error.code : "unavailable" },
    );
  }
}

export async function searchAreaPrices(query: string): Promise<AreaPrice[]> {
  const trimmed = query.trim();
  if (trimmed.length < QUERY_MIN_LENGTH) {
    throw new HttpError("Search query is too short", HTTP_BAD_REQUEST, QUERY_TOO_SHORT_CODE);
  }
  try {
    return await searchOfficialAreaPrices(trimmed);
  } catch (error) {
    if (error instanceof IsraelAddressError && error.code === "rate_limit") {
      throw Object.assign(new Error(error.message), { status: HTTP_TOO_MANY_REQUESTS, code: error.code });
    }
    throw Object.assign(
      new Error(error instanceof Error ? error.message : "Area price lookup unavailable"),
      { status: HTTP_BAD_GATEWAY, code: error instanceof IsraelAddressError ? error.code : "unavailable" },
    );
  }
}

export async function listLawyers(userId: string): Promise<Lawyer[]> {
  const rows = await prisma.lawyer.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return rows.map(serializeLawyer);
}

export async function addLawyer(userId: string, input: LawyerInput): Promise<Lawyer> {
  const name = input.name.trim();
  if (name.length < LAWYER_NAME_MIN) {
    throw new HttpError("Lawyer name is required", HTTP_BAD_REQUEST, LAWYER_NAME_REQUIRED_CODE);
  }
  const phone = optionalText(input.phone);
  if (phone && !isValidPhone(phone)) {
    throw new HttpError("Invalid phone", HTTP_BAD_REQUEST, INVALID_PHONE_CODE);
  }
  const row = await prisma.lawyer.create({
    data: {
      userId,
      name,
      city: optionalText(input.city),
      specialty: optionalText(input.specialty),
      phone: phone ? normalizePhone(phone) : null,
      notes: optionalText(input.notes),
    },
  });
  return serializeLawyer(row);
}

export async function listSavedAddresses(userId: string): Promise<SavedAddress[]> {
  const rows = await prisma.savedAddress.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return rows.map(serializeSavedAddress);
}

export async function saveAddress(userId: string, input: SavedAddressInput): Promise<SavedAddress> {
  const city = input.city.trim();
  if (!city) {
    throw new HttpError("City is required", HTTP_BAD_REQUEST, ADDRESS_CITY_REQUIRED_CODE);
  }
  const row = await prisma.savedAddress.create({
    data: {
      userId,
      city,
      street: optionalText(input.street),
      cityCode: optionalText(input.cityCode),
      streetCode: optionalText(input.streetCode),
      region: optionalText(input.region),
      source: PROPERTY_SOURCE_OFFICIAL,
    },
  });
  return serializeSavedAddress(row);
}

function optionalNumber(value: number | null | undefined): number | null {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return null;
  return Number(value);
}

export async function listHomes(userId: string): Promise<Home[]> {
  const rows = await prisma.home.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return rows.map(serializeHome);
}

export async function addHome(userId: string, input: HomeInput): Promise<Home> {
  const city = input.city.trim();
  if (!city) {
    throw new HttpError("City is required", HTTP_BAD_REQUEST, ADDRESS_CITY_REQUIRED_CODE);
  }
  const dealType = HOME_DEAL_TYPES.includes(input.dealType) ? input.dealType : HOME_DEAL_TYPES[0];
  const row = await prisma.home.create({
    data: {
      userId,
      dealType,
      city,
      street: optionalText(input.street),
      houseNumber: optionalText(input.houseNumber),
      neighborhood: optionalText(input.neighborhood),
      rooms: optionalNumber(input.rooms),
      sqm: optionalNumber(input.sqm),
      floor: optionalNumber(input.floor),
      price: optionalNumber(input.price),
      features: JSON.stringify(input.features ?? []),
      imageUrls: JSON.stringify(input.imageUrls ?? []),
      model3dUrl: optionalText(input.model3dUrl),
      nextDueDate: optionalText(input.nextDueDate),
      nextDueTitle: optionalText(input.nextDueTitle),
      notes: optionalText(input.notes),
      source: PROPERTY_SOURCE_USER,
    },
  });
  return serializeHome(row);
}

export async function listPropertyExpenses(userId: string): Promise<PropertyExpense[]> {
  const rows = await prisma.propertyExpense.findMany({
    where: { userId },
    orderBy: { occurredAt: "desc" },
  });
  return rows.map(serializePropertyExpense);
}

export async function addPropertyExpense(userId: string, input: PropertyExpenseInput): Promise<PropertyExpense> {
  const row = await prisma.propertyExpense.create({
    data: {
      userId,
      category: optionalText(input.category) ?? "other",
      amount: Number(input.amount),
      occurredAt: new Date(input.occurredAt),
      description: optionalText(input.description),
    },
  });
  return serializePropertyExpense(row);
}
