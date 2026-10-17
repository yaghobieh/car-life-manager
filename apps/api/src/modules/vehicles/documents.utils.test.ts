import { describe, expect, it } from "vitest";
import { DOCUMENT_MAX_BYTES } from "../../constants/http.const";
import { decodeDocumentBase64, isAllowedDocumentMime, parseDocumentFile } from "./documents.utils";

describe("documents.utils", () => {
  it("accepts official document mime types", () => {
    expect(isAllowedDocumentMime("application/pdf")).toBe(true);
    expect(isAllowedDocumentMime("image/jpeg")).toBe(true);
    expect(isAllowedDocumentMime("text/plain")).toBe(false);
  });

  it("decodes raw and data-url base64", () => {
    const raw = Buffer.from("hello").toString("base64");
    expect(decodeDocumentBase64(raw).toString()).toBe("hello");
    expect(decodeDocumentBase64(`data:text/plain;base64,${raw}`).toString()).toBe("hello");
  });

  it("rejects oversized and empty files", () => {
    expect(parseDocumentFile(null)).toBeNull();
    expect(parseDocumentFile({
      fileName: "x.pdf",
      mimeType: "application/pdf",
      contentBase64: "",
    })).toBeNull();
    const huge = Buffer.alloc(DOCUMENT_MAX_BYTES + 1, 1).toString("base64");
    expect(() => parseDocumentFile({
      fileName: "x.pdf",
      mimeType: "application/pdf",
      contentBase64: huge,
    })).toThrow();
  });
});
