import type { Lawyer, LawyerInput, OfficialAddress, SavedAddress, SavedAddressInput } from "@clm/shared";
import { HTTP_BAD_GATEWAY, HTTP_BAD_REQUEST, HTTP_TOO_MANY_REQUESTS } from "../../constants/http.const";
import { prisma } from "../../db";
import { HttpError } from "../../errors/http-error";
import { IsraelAddressError, searchOfficialAddresses } from "../../integrations/israel-addresses/client";
import { QUERY_MIN_LENGTH } from "../../integrations/israel-addresses/addresses.const";
import { isValidPhone, normalizePhone } from "../auth/auth.utils";
import {
  ADDRESS_CITY_REQUIRED_CODE,
  INVALID_PHONE_CODE,
  LAWYER_NAME_MIN,
  LAWYER_NAME_REQUIRED_CODE,
  NOTES_MAX_LENGTH,
  PROPERTY_SOURCE_OFFICIAL,
  QUERY_TOO_SHORT_CODE,
} from "./property.const";
import { serializeLawyer, serializeSavedAddress } from "./serialize";

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
