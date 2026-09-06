import { describe, expect, it } from "vitest";
import { generateVehicleTasks } from "./task-engine";
import { catalogWithTimestamp } from "./providers";
import type { Vehicle } from "./types";

const vehicle: Vehicle = {
  id: "v1",
  userId: "u1",
  registrationNumber: "6712345",
  formattedRegistrationNumber: "67-123-45",
  make: "טויוטה",
  model: "קורולה",
  modelYear: 2022,
  fuelType: "היברידי",
  engine: null,
  color: null,
  registrationDate: "2022-06-15",
  registrationExpiry: "2025-07-15",
  lastTestDate: "2024-11-20",
  nextTestDate: "2025-11-20",
  ownershipSequence: null,
  ownershipType: "פרטי",
  mileage: null,
  dataSource: "Ministry of Transport / data.gov.il",
  dataProvenance: "official",
  dataSourceUpdatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe("generateVehicleTasks", () => {
  it("creates insurance and service tasks without inventing connections", () => {
    const tasks = generateVehicleTasks({
      vehicle,
      services: catalogWithTimestamp(),
      expenses: [],
      documents: [],
    });
    expect(tasks.some((task) => task.category === "insurance")).toBe(true);
    expect(tasks.some((task) => task.provider === "pango")).toBe(true);
    expect(tasks.every((task) => task.source === "task-engine")).toBe(true);
  });
});
