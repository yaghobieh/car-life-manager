import { describe, expect, it } from "vitest";
import { listReadyServices } from "./providers.registry";

describe("listReadyServices", () => {
  it("keeps catalog providers unsupported until a real adapter exists", async () => {
    const services = await listReadyServices({
      userId: "user-1",
      vehicleId: "vehicle-1",
      registrationNumber: "68853001",
    });

    expect(services.length > 0).toBe(true);
    expect(services.filter((service) => service.providerId === "pango").every((service) => service.status === "not_supported")).toBe(true);
    expect(services.some((service) => service.providerId === "ministry-of-transport" && service.status === "official")).toBe(true);
  });
});
