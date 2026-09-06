import { VEHICLE_IMAGE_DEFAULT, VEHICLE_IMAGE_KIA, VEHICLE_IMAGE_SEDAN } from '@const';

export const CAR_ART_BODY = '#f4f7fb';
export const CAR_ART_STROKE = '#d5deea';
export const CAR_ART_TIRE = '#1b2d44';
export const CAR_ART_RIM = '#9aa8b8';
export const CAR_ART_WINDOW = '#dce6f2';

export const VEHICLE_IMAGE_BY_MAKE: Record<string, string> = {
  kia: VEHICLE_IMAGE_KIA,
  קיה: VEHICLE_IMAGE_KIA,
  toyota: VEHICLE_IMAGE_SEDAN,
  טויוטה: VEHICLE_IMAGE_SEDAN,
  hyundai: VEHICLE_IMAGE_SEDAN,
  יונדאי: VEHICLE_IMAGE_SEDAN,
  mazda: VEHICLE_IMAGE_SEDAN,
  מאזדה: VEHICLE_IMAGE_SEDAN,
};

export { VEHICLE_IMAGE_DEFAULT };
