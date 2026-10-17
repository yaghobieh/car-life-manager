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

  it("keeps a user confirmation without calling it connected", async () => {
    const services = await listReadyServices(
      {
        userId: "user-1",
        vehicleId: "vehicle-1",
        registrationNumber: "68853001",
      },
      [{
        providerId: "pango",
        status: "user_confirmed",
        note: "User confirmed",
        source: "user",
        confirmedByUserAt: "2026-09-06T00:00:00.000Z",
      }],
    );

    const pango = services.find((service) => service.providerId === "pango");
    expect(pango?.status).toBe("user_confirmed");
    expect(pango?.source).toBe("user");
    expect(pango?.status === "connected").toBe(false);
  });
});
