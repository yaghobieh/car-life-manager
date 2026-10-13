import type { Vehicle } from '@clm/shared';
import { ZERO } from '@const';

export function resolveSelectedVehicleId(currentId: string | null, vehicles: Vehicle[]): string | null {
  if (currentId && vehicles.some((vehicle) => vehicle.id === currentId)) {
    return currentId;
  }
  return vehicles[ZERO]?.id ?? null;
}
