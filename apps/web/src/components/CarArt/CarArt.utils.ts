import { EMPTY_STRING, VEHICLE_IMAGE_DEFAULT } from '@const';
import { VEHICLE_IMAGE_BY_MAKE } from './CarArt.const';

export function vehicleImageSrc(make: string | null | undefined): string {
  if (!make) return VEHICLE_IMAGE_DEFAULT;
  const trimmed = make.trim();
  if (trimmed === EMPTY_STRING) return VEHICLE_IMAGE_DEFAULT;
  const lower = trimmed.toLowerCase();
  const exact = VEHICLE_IMAGE_BY_MAKE[lower] ?? VEHICLE_IMAGE_BY_MAKE[trimmed];
  if (exact) return exact;

  const alias = Object.entries(VEHICLE_IMAGE_BY_MAKE).find(([key]) => {
    return lower.includes(key.toLowerCase()) || trimmed.includes(key);
  });
  return alias?.[1] ?? VEHICLE_IMAGE_DEFAULT;
}
