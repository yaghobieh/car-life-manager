export interface DocumentFileInput {
  fileName: string;
  mimeType: string;
  contentBase64: string;
}

export interface AddDocumentInput {
  type: string;
  title: string;
  notes?: string | null;
  expiresAt?: string | null;
  file?: DocumentFileInput | null;
}

export interface StoredDocumentFile {
  body: Uint8Array;
  mimeType: string;
  originalName: string;
}
