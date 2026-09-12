import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DOCUMENT_UPLOADS_DIR } from "../constants/http.const";
import type { StorageProvider, StoredObject } from "./storage.types";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_ROOT = path.resolve(MODULE_DIR, "../../", DOCUMENT_UPLOADS_DIR);

export function localDocumentPath(storageKey: string): string {
  return path.join(UPLOADS_ROOT, storageKey);
}

export function localStorage(): StorageProvider {
  return {
    async put(key: string, bytes: Uint8Array, contentType: string): Promise<StoredObject> {
      const filePath = localDocumentPath(key);
      await mkdir(path.dirname(filePath), { recursive: true });
      await writeFile(filePath, bytes);
      return { key, contentType };
    },
    async get(key: string): Promise<Uint8Array | null> {
      try {
        return await readFile(localDocumentPath(key));
      } catch {
        return null;
      }
    },
    async remove(key: string): Promise<void> {
      try {
        await unlink(localDocumentPath(key));
      } catch {
        return;
      }
    },
  };
}
