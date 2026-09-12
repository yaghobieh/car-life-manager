import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { config, isDevelopment } from "../../config";
import {
  AUTH_ERROR_QUERY,
  AUTH_NEXT_COOKIE,
  AUTH_PATH,
  SAFE_PATH_APARTMENT,
  SAFE_PATH_CAR,
  SAFE_PATH_CARLIFE,
  SAFE_PATH_PROPERTY,
  EMAIL_AT,
  EMAIL_PATTERN,
  HASH_SEPARATOR,
  IL_COUNTRY_DIGITS,
  IL_MOBILE_LOCAL_LENGTH,
  IL_MOBILE_NATIONAL_LENGTH,
  IL_TRUNK_PREFIX,
  PHONE_MAX_DIGITS,
  PHONE_MIN_DIGITS,
  PHONE_PLUS,
  SCRYPT_KEYLEN,
  SESSION_MAX_AGE_MS,
  TOKEN_BYTES,
  USERNAME_PATTERN,
} from "./auth.const";
import type { AuthUserPayload, SessionCookieOptions } from "./auth.types";

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email);
}

export function normalizeUsername(username: string): string {
  return username.trim().toLowerCase();
}

export function isValidUsername(username: string): boolean {
  return USERNAME_PATTERN.test(username);
}

export function isEmailIdentifier(identifier: string): boolean {
  return identifier.includes(EMAIL_AT);
}

export function hashPassword(password: string): string {
  const salt = randomBytes(TOKEN_BYTES).toString("hex");
  const hash = scryptSync(password, salt, SCRYPT_KEYLEN).toString("hex");
  return `${salt}${HASH_SEPARATOR}${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(HASH_SEPARATOR);
  if (!salt || !hash) return false;
  const next = scryptSync(password, salt, SCRYPT_KEYLEN);
  const current = Buffer.from(hash, "hex");
  if (next.length !== current.length) return false;
  return timingSafeEqual(next, current);
}

export function randomToken(): string {
  return randomBytes(TOKEN_BYTES).toString("hex");
}

export function readCookie(cookieHeader: string, name: string): string | undefined {
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match?.[1];
}

export function sessionCookieOptions(): SessionCookieOptions {
  return {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_MS,
    secure: !isDevelopment(),
  };
}

export function serializeAuthUser(user: {
  id: string;
  email: string | null;
  username: string | null;
  name: string | null;
  phone: string | null;
  imageUrl: string | null;
  notifyEmail: boolean;
  notifySms: boolean;
  role: string;
}): AuthUserPayload {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    name: user.name,
    phone: user.phone,
    imageUrl: user.imageUrl,
    notifyEmail: user.notifyEmail,
    notifySms: user.notifySms,
    role: user.role,
  };
}

export function toE164Phone(phone: string | null): string | null {
  if (!phone) return null;
  const trimmed = phone.trim();
  if (!trimmed) return null;
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return null;
  if (trimmed.startsWith(PHONE_PLUS)) return `${PHONE_PLUS}${digits}`;
  if (digits.startsWith(IL_COUNTRY_DIGITS)) return `${PHONE_PLUS}${digits}`;
  if (digits.startsWith(IL_TRUNK_PREFIX) && digits.length === IL_MOBILE_LOCAL_LENGTH) {
    return `${PHONE_PLUS}${IL_COUNTRY_DIGITS}${digits.slice(1)}`;
  }
  if (digits.length === IL_MOBILE_NATIONAL_LENGTH) {
    return `${PHONE_PLUS}${IL_COUNTRY_DIGITS}${digits}`;
  }
  return `${PHONE_PLUS}${digits}`;
}

export function normalizePhone(phone: string): string | null {
  return toE164Phone(phone);
}

export function isValidPhone(phone: string): boolean {
  const trimmed = phone.trim();
  if (!trimmed) return true;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= PHONE_MIN_DIGITS && digits.length <= PHONE_MAX_DIGITS;
}

export function isSafeAppPath(path: string): boolean {
  if (!path.startsWith("/") || path.startsWith("//")) return false;
  return (
    path === SAFE_PATH_CAR
    || path.startsWith(`${SAFE_PATH_CAR}/`)
    || path === SAFE_PATH_PROPERTY
    || path.startsWith(`${SAFE_PATH_PROPERTY}/`)
    || path === SAFE_PATH_CARLIFE
    || path === SAFE_PATH_APARTMENT
  );
}

export function appHomeUrl(next?: string | null): string {
  const safe = next && isSafeAppPath(next) ? next : "/";
  return `${config.webOrigin}${safe}`;
}

export function readAuthNext(cookieHeader: string): string | null {
  return readCookie(cookieHeader, AUTH_NEXT_COOKIE) ?? null;
}

export function authErrorUrl(code: string): string {
  const url = new URL(AUTH_PATH, `${config.webOrigin}/`);
  url.searchParams.set(AUTH_ERROR_QUERY, code);
  return url.toString();
}
