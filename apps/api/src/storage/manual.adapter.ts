import type { StorageProvider, StoredObject } from "./storage.types";

export function manualStorage(): StorageProvider {
  return {
    async put(key: string, _bytes: Uint8Array, contentType: string): Promise<StoredObject> {
      return { key, contentType };
    },
    async get(): Promise<Uint8Array | null> {
      return null;
    },
    async remove(): Promise<void> {
      return;
    },
  };
}
