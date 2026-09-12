import { describe, expect, it } from "vitest";
import {
  cloudinaryStorageKey,
  isCloudinaryKey,
  parseCloudinaryKey,
  parseCloudinaryUrl,
  signCloudinaryParams,
} from "./cloudinary.utils";

describe("cloudinary.utils", () => {
  it("parses CLOUDINARY_URL", () => {
    const account = parseCloudinaryUrl("cloudinary://key:secret@demo-cloud");
    expect(account).toEqual({ apiKey: "key", apiSecret: "secret", cloudName: "demo-cloud" });
    expect(parseCloudinaryUrl("https://example.com")).toBeNull();
  });

  it("signs params the Cloudinary way", () => {
    expect(signCloudinaryParams({ folder: "clm", public_id: "doc-1", timestamp: "1700000000" }, "secret")).toBe(
      "b86d486c5e56efc7d9f8959bc900dfc0b3924386",
    );
  });

  it("round-trips storage keys", () => {
    const key = cloudinaryStorageKey("raw", "clm/user/doc");
    expect(isCloudinaryKey(key)).toBe(true);
    expect(parseCloudinaryKey(key)).toEqual({ resourceType: "raw", publicId: "clm/user/doc" });
    expect(parseCloudinaryKey("manual")).toBeNull();
  });
});
