import { describe, expect, it } from "vitest";
import { mapCityRecord, mapStreetRecord } from "./map-record";

describe("mapCityRecord", () => {
  it("maps an official city row", () => {
    expect(
      mapCityRecord({
        city_code: 5000,
        city_name_he: "תל אביב-יפו",
        region_name: "תל אביב",
      }),
    ).toEqual({
      id: "city-5000",
      kind: "city",
      city: "תל אביב-יפו",
      street: null,
      cityCode: "5000",
      streetCode: null,
      region: "תל אביב",
      source: "official",
    });
  });

  it("returns null without a Hebrew or English name", () => {
    expect(mapCityRecord({ city_code: 1 })).toBeNull();
  });
});

describe("mapStreetRecord", () => {
  it("maps an official street row", () => {
    expect(
      mapStreetRecord({
        city_code: 5000,
        city_name: "תל אביב-יפו",
        street_code: "123",
        street_name: "דיזנגוף",
        region_name: "תל אביב",
      }),
    ).toEqual({
      id: "street-5000-123",
      kind: "street",
      city: "תל אביב-יפו",
      street: "דיזנגוף",
      cityCode: "5000",
      streetCode: "123",
      region: "תל אביב",
      source: "official",
    });
  });
});
