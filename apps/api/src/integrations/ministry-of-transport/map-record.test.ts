import { describe, expect, it } from "vitest";
import { mapMinistryRecord } from "./map-record";

describe("mapMinistryRecord", () => {
  it("maps official fields and does not invent ownership hand", () => {
    const result = mapMinistryRecord({
      mispar_rechev: 6712345,
      tozeret_nm: "טויוטה",
      kinuy_mishari: "קורולה",
      shnat_yitzur: 2022,
      delek_nm: "חשמל/בנזין",
      tokef_dt: "2025-07-15",
      mivchan_acharon_dt: "2024-11-20",
      baalut: "פרטי",
      moed_aliya_lakvish: "2022-06-15",
    });
    expect(result.vehicle.make).toBe("טויוטה");
    expect(result.vehicle.formattedRegistrationNumber).toBe("67-123-45");
    expect(result.vehicle.ownershipSequence).toBeNull();
    expect(result.vehicle.dataProvenance).toBe("official");
    expect(result.vehicle.nextTestDate).toContain("2025-11-20");
  });
});
