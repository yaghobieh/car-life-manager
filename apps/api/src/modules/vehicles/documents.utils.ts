import { DOCUMENT_ALLOWED_MIMES, DOCUMENT_MAX_BYTES, HTTP_BAD_REQUEST } from "../../constants/http.const";
import { HttpError } from "../../errors/http-error";
import {
  BASE64_COMMA,
  BASE64_ENCODING,
  DOCUMENT_FILE_TOO_LARGE_CODE,
  DOCUMENT_FILE_TOO_LARGE_MESSAGE,
  DOCUMENT_INVALID_FILE_CODE,
  DOCUMENT_INVALID_FILE_MESSAGE,
  DOCUMENT_INVALID_TYPE_CODE,
  DOCUMENT_INVALID_TYPE_MESSAGE,
} from "./vehicles.const";
import type { DocumentFileInput } from "./vehicles.types";

export function isAllowedDocumentMime(mimeType: string): boolean {
  return (DOCUMENT_ALLOWED_MIMES as readonly string[]).includes(mimeType);
}

export function decodeDocumentBase64(contentBase64: string): Buffer {
  const comma = contentBase64.indexOf(BASE64_COMMA);
  const payload = comma >= 0 ? contentBase64.slice(comma + 1) : contentBase64;
  return Buffer.from(payload, BASE64_ENCODING);
}

export function parseDocumentFile(input: DocumentFileInput | null): { buffer: Buffer; mimeType: string; fileName: string } | null {
  if (!input?.contentBase64) return null;
  const mimeType = input.mimeType.trim();
  const fileName = input.fileName.trim();
  if (!mimeType || !fileName || !isAllowedDocumentMime(mimeType)) {
    throw new HttpError(DOCUMENT_INVALID_TYPE_MESSAGE, HTTP_BAD_REQUEST, DOCUMENT_INVALID_TYPE_CODE);
  }
  const buffer = decodeDocumentBase64(input.contentBase64);
  if (!buffer.length) {
    throw new HttpError(DOCUMENT_INVALID_FILE_MESSAGE, HTTP_BAD_REQUEST, DOCUMENT_INVALID_FILE_CODE);
  }
  if (buffer.length > DOCUMENT_MAX_BYTES) {
    throw new HttpError(DOCUMENT_FILE_TOO_LARGE_MESSAGE, HTTP_BAD_REQUEST, DOCUMENT_FILE_TOO_LARGE_CODE);
  }
  return { buffer, mimeType, fileName };
}

export function documentObjectKey(userId: string, documentId: string): string {
  return `${userId}/${documentId}`;
}
