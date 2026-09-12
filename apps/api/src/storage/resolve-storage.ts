import { config, isCloudinaryReady } from "../config";
import { HTTP_UNAVAILABLE } from "../constants/http.const";
import { HttpError } from "../errors/http-error";
import { cloudinaryStorage } from "./cloudinary.adapter";
import { isCloudinaryKey, parseCloudinaryUrl } from "./cloudinary.utils";
import { localStorage } from "./local.adapter";
import {
  DOCUMENT_STORAGE_UNAVAILABLE_CODE,
  DOCUMENT_STORAGE_UNAVAILABLE_MESSAGE,
} from "./storage.const";
import type { StorageProvider } from "./storage.types";

function cloudinaryOrThrow(): StorageProvider {
  const account = parseCloudinaryUrl(config.cloudinaryUrl);
  if (!account) {
    throw new HttpError(
      DOCUMENT_STORAGE_UNAVAILABLE_MESSAGE,
      HTTP_UNAVAILABLE,
      DOCUMENT_STORAGE_UNAVAILABLE_CODE,
    );
  }
  return cloudinaryStorage(account);
}

export function resolveDocumentStorage(): StorageProvider {
  if (isCloudinaryReady()) return cloudinaryOrThrow();
  return localStorage();
}

export function storageForKey(storageKey: string): StorageProvider {
  if (isCloudinaryKey(storageKey)) return cloudinaryOrThrow();
  return localStorage();
}
