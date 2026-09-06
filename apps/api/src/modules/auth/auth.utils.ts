import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { config, isDevelopment } from "../../config";
import {
  AUTH_ERROR_QUERY,
  AUTH_PATH,
  EMAIL_PATTERN,
  HASH_SEPARATOR,
  PHONE_MAX_DIGITS,
  PHONE_MIN_DIGITS,
  SCRYPT_KEYLEN,
  SESSION_MAX_AGE_MS,
  TOKEN_BYTES,
} from "./auth.const";
import type { AuthUserPayload, SessionCookieOptions } from "./auth.types";

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email);
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
  name: string | null;
  phone: string | null;
  imageUrl: string | null;
}): AuthUserPayload {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    imageUrl: user.imageUrl,
  };
}

export function normalizePhone(phone: string): string | null {
  const trimmed = phone.trim();
  return trimmed || null;
}

export function isValidPhone(phone: string): boolean {
  const trimmed = phone.trim();
  if (!trimmed) return true;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= PHONE_MIN_DIGITS && digits.length <= PHONE_MAX_DIGITS;
}

export function appHomeUrl(): string {
  return `${config.webOrigin}/`;
}

export function authErrorUrl(code: string): string {
  const url = new URL(AUTH_PATH, `${config.webOrigin}/`);
  url.searchParams.set(AUTH_ERROR_QUERY, code);
  return url.toString();
}
