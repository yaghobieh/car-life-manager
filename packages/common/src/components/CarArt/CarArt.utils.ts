import { EMPTY_STRING, VEHICLE_IMAGE_DEFAULT } from '@const';
import { VEHICLE_COLOR_HEX, VEHICLE_IMAGE_BY_MAKE } from './CarArt.const';

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

export function vehiclePaintHex(color: string | null | undefined): string | null {
  if (!color) return null;
  const trimmed = color.trim();
  if (trimmed === EMPTY_STRING) return null;
  const lower = trimmed.toLowerCase();
  const exact = VEHICLE_COLOR_HEX[lower] ?? VEHICLE_COLOR_HEX[trimmed];
  if (exact) return exact;

  const alias = Object.entries(VEHICLE_COLOR_HEX).find(([key]) => {
    return lower.includes(key.toLowerCase()) || trimmed.includes(key);
  });
  return alias?.[1] ?? null;
}
