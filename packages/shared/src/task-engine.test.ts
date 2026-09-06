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
      recalls: [],
    });
    expect(tasks.some((task) => task.category === "insurance")).toBe(true);
    expect(tasks.some((task) => task.provider === "pango")).toBe(true);
    expect(tasks.filter((task) => task.category !== "recall").every((task) => task.source === "task-engine")).toBe(true);
  });

  it("creates official recall tasks from Ministry of Transport records", () => {
    const tasks = generateVehicleTasks({
      vehicle,
      services: catalogWithTimestamp(),
      expenses: [],
      documents: [],
      recalls: [
        {
          recallId: "15781",
          kind: "תקלה סידרתית בטיחותית",
          faultKind: "חשמל",
          description: "נוזל בלמים",
          openedAt: "2024-12-03",
        },
      ],
    });
    const recall = tasks.find((item) => item.category === "recall");
    expect(recall?.title).toBe("קריאה לתיקון 15781");
    expect(recall?.source).toBe("official-recall:15781");
    expect(recall?.status).toBe("needs_attention");
  });
});
