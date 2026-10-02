import { DOCUMENT_MAX_BYTES } from './Documents.const';

const DATA_URL_COMMA = ',';

export function isAllowedDocumentSize(size: number): boolean {
  return size > 0 && size <= DOCUMENT_MAX_BYTES;
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result ?? '');
      const comma = result.indexOf(DATA_URL_COMMA);
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function triggerBlobDownload(blob: Blob, fileName: string): void {
  const href = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(href);
}
