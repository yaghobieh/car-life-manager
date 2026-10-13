export interface StoredObject {
  key: string;
  contentType: string;
}

export interface StorageProvider {
  put(key: string, bytes: Uint8Array, contentType: string): Promise<StoredObject>;
  get(key: string): Promise<Uint8Array | null>;
  remove(key: string): Promise<void>;
}

export interface CloudinaryAccount {
  apiKey: string;
  apiSecret: string;
  cloudName: string;
}
