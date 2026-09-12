import { HTTP_BAD_GATEWAY } from "../constants/http.const";
import { HttpError } from "../errors/http-error";
import { logger } from "../logger";
import {
  CLOUDINARY_API_HOST,
  CLOUDINARY_FOLDER,
  CLOUDINARY_RES_HOST,
  CLOUDINARY_UPLOAD_PATH,
  DOCUMENT_UPLOAD_FAILED_CODE,
  DOCUMENT_UPLOAD_FAILED_MESSAGE,
} from "./storage.const";
import type { CloudinaryAccount, StorageProvider, StoredObject } from "./storage.types";
import { cloudinaryStorageKey, parseCloudinaryKey, signCloudinaryParams } from "./cloudinary.utils";

interface CloudinaryUploadResponse {
  public_id?: string;
  resource_type?: string;
}

export function cloudinaryStorage(account: CloudinaryAccount): StorageProvider {
  return {
    async put(key: string, bytes: Uint8Array, contentType: string): Promise<StoredObject> {
      const timestamp = String(Math.floor(Date.now() / 1000));
      const params = { folder: CLOUDINARY_FOLDER, public_id: key, timestamp };
      const signature = signCloudinaryParams(params, account.apiSecret);
      const body = new FormData();
      body.append("file", new Blob([Buffer.from(bytes)], { type: contentType }));
      body.append("api_key", account.apiKey);
      body.append("timestamp", timestamp);
      body.append("folder", CLOUDINARY_FOLDER);
      body.append("public_id", key);
      body.append("signature", signature);
      const response = await fetch(
        `${CLOUDINARY_API_HOST}/${account.cloudName}/${CLOUDINARY_UPLOAD_PATH}`,
        { method: "POST", body },
      );
      if (!response.ok) {
        logger.warn("cloudinary upload failed", response.status);
        throw new HttpError(DOCUMENT_UPLOAD_FAILED_MESSAGE, HTTP_BAD_GATEWAY, DOCUMENT_UPLOAD_FAILED_CODE);
      }
      const uploaded = (await response.json()) as CloudinaryUploadResponse;
      if (!uploaded.public_id || !uploaded.resource_type) {
        throw new HttpError(DOCUMENT_UPLOAD_FAILED_MESSAGE, HTTP_BAD_GATEWAY, DOCUMENT_UPLOAD_FAILED_CODE);
      }
      return { key: cloudinaryStorageKey(uploaded.resource_type, uploaded.public_id), contentType };
    },
    async get(key: string): Promise<Uint8Array | null> {
      const parsed = parseCloudinaryKey(key);
      if (!parsed) return null;
      const url = `${CLOUDINARY_RES_HOST}/${account.cloudName}/${parsed.resourceType}/upload/${parsed.publicId}`;
      const response = await fetch(url);
      if (!response.ok) return null;
      return new Uint8Array(await response.arrayBuffer());
    },
  };
}
