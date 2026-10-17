import { describe, expect, it } from "vitest";
import { PROVIDER_HIGHWAY_6, PROVIDER_HIGHWAY_6_NORTH, CONNECTION_NOT_SUPPORTED } from "./providers.const";
import { probeProviderHub } from "./providers.hub";
import { listReadyServices } from "./providers.registry";

describe("Highway 6 integration", () => {
  it("remains unsupported by default without fake connected state", async () => {
    const status = await probeProviderHub(PROVIDER_HIGHWAY_6);
    expect(status).toBe(CONNECTION_NOT_SUPPORTED);

    const northStatus = await probeProviderHub(PROVIDER_HIGHWAY_6_NORTH);
    expect(northStatus).toBe(CONNECTION_NOT_SUPPORTED);
  });

  it("lists Highway 6 and Highway 6 North with authentic official portal URLs", async () => {
    const services = await listReadyServices({
      userId: "user-1",
      vehicleId: "vehicle-1",
      registrationNumber: "12345678",
    });

    const h6 = services.find((service) => service.providerId === PROVIDER_HIGHWAY_6);
    expect(h6).toBeDefined();
    expect(h6?.status).toBe(CONNECTION_NOT_SUPPORTED);
    expect(h6?.officialUrl).toBe("https://www.kvish6.co.il");
    expect(h6?.category).toBe("toll");

    const h6North = services.find((service) => service.providerId === PROVIDER_HIGHWAY_6_NORTH);
    expect(h6North).toBeDefined();
    expect(h6North?.status).toBe(CONNECTION_NOT_SUPPORTED);
    expect(h6North?.officialUrl).toBe("https://www.kvish6.co.il");
  });

  it("never marks Highway 6 as connected from user confirmation, only user_confirmed", async () => {
    const services = await listReadyServices(
      {
        userId: "user-1",
        vehicleId: "vehicle-1",
        registrationNumber: "12345678",
      },
      [
        {
          providerId: PROVIDER_HIGHWAY_6,
          status: "user_confirmed",
          note: "User manually confirmed toll tag",
          source: "user",
          confirmedByUserAt: "2026-10-17T08:00:00.000Z",
        },
      ],
    );

    const h6 = services.find((service) => service.providerId === PROVIDER_HIGHWAY_6);
    expect(h6?.status).toBe("user_confirmed");
    expect(h6?.source).toBe("user");
    expect(h6?.status === "connected").toBe(false);
  });
});
