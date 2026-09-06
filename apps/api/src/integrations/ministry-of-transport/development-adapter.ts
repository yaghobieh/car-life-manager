import { formatRegistrationNumber, normalizeRegistrationNumber, type VehicleLookupResult } from "@clm/shared";

/** Labeled development-only fallback. Never used when VEHICLE_DATA_SOURCE=official. */
export function developmentVehicle(registrationNumber: string): VehicleLookupResult {
  const plate = normalizeRegistrationNumber(registrationNumber);
  return {
    rawAvailable: false,
    recalls: [],
    vehicle: {
      registrationNumber: plate,
      formattedRegistrationNumber: formatRegistrationNumber(plate),
      make: null,
      model: null,
      modelYear: null,
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
      dataSource: "Development adapter — no official record",
      dataProvenance: "development",
      dataSourceUpdatedAt: new Date().toISOString(),
    },
  };
}
