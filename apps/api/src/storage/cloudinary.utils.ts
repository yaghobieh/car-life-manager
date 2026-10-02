import { createHash } from "node:crypto";
import {
  CLOUDINARY_HEX,
  CLOUDINARY_KEY_SEP,
  CLOUDINARY_SHA1,
  CLOUDINARY_STORAGE_PREFIX,
  CLOUDINARY_URL_PREFIX,
} from "./storage.const";
import type { CloudinaryAccount } from "./storage.types";

export function parseCloudinaryUrl(url: string): CloudinaryAccount | null {
  if (!url.startsWith(CLOUDINARY_URL_PREFIX)) return null;
  try {
    const parsed = new URL(url);
    const apiKey = decodeURIComponent(parsed.username);
    const apiSecret = decodeURIComponent(parsed.password);
    const cloudName = parsed.hostname;
    if (!apiKey || !apiSecret || !cloudName) return null;
    return { apiKey, apiSecret, cloudName };
  } catch {
    return null;
  }
}

export function signCloudinaryParams(params: Record<string, string>, apiSecret: string): string {
  const toSign = Object.keys(params)
    .filter((key) => params[key] !== "")
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return createHash(CLOUDINARY_SHA1).update(`${toSign}${apiSecret}`).digest(CLOUDINARY_HEX);
}

export function isCloudinaryKey(storageKey: string): boolean {
  return storageKey.startsWith(CLOUDINARY_STORAGE_PREFIX);
}

export function cloudinaryStorageKey(resourceType: string, publicId: string): string {
  return `${CLOUDINARY_STORAGE_PREFIX}${resourceType}${CLOUDINARY_KEY_SEP}${publicId}`;
}

export function parseCloudinaryKey(storageKey: string): { resourceType: string; publicId: string } | null {
  if (!isCloudinaryKey(storageKey)) return null;
  const rest = storageKey.slice(CLOUDINARY_STORAGE_PREFIX.length);
  const sep = rest.indexOf(CLOUDINARY_KEY_SEP);
  if (sep <= 0) return null;
  const resourceType = rest.slice(0, sep);
  const publicId = rest.slice(sep + 1);
  if (!resourceType || !publicId) return null;
  return { resourceType, publicId };
}
