import { describe, expect, it } from "vitest";
import { buildTimeline } from "./timeline";
import type { Vehicle } from "./types";

const vehicle: Vehicle = {
  id: "v1",
  userId: "u1",
  registrationNumber: "6712345",
  formattedRegistrationNumber: "67-123-45",
  make: "Toyota",
  model: "Corolla",
  modelYear: 2022,
  fuelType: null,
  engine: null,
  color: null,
  registrationDate: null,
  registrationExpiry: null,
  lastTestDate: null,
  nextTestDate: null,
  ownershipSequence: null,
  ownershipType: null,
  mileage: null,
  dataSource: "ministry-of-transport",
  dataProvenance: "official",
  dataSourceUpdatedAt: "2026-09-06T00:00:00.000Z",
  createdAt: "2026-09-01T00:00:00.000Z",
  updatedAt: "2026-09-01T00:00:00.000Z",
};

describe("buildTimeline", () => {
  it("includes vehicle added and user documents newest first", () => {
    const events = buildTimeline({
      vehicle,
      documents: [{
        id: "d1",
        vehicleId: "v1",
        type: "insurance",
        title: "Insurance.pdf",
        notes: null,
        expiresAt: null,
        storageKey: "manual",
        originalName: null,
        mimeType: null,
        fileSize: null,
        hasFile: false,
        createdAt: "2026-09-05T00:00:00.000Z",
      }],
      expenses: [],
      maintenance: [],
      reminders: [],
      tasks: [],
      services: [],
    });

    expect(events[0]?.type).toBe("document_added");
    expect(events[1]?.type).toBe("vehicle_added");
    expect(events[1]?.source).toBe("official");
  });
});
