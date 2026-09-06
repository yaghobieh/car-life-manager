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

export const VEHICLE_COLOR_HEX: Record<string, string> = {
  לבן: '#f3efe6',
  'לבן פנינה': '#f7f1e4',
  שחור: '#1c1c1c',
  כסף: '#c7ccd2',
  כסוף: '#c7ccd2',
  אפור: '#8a9098',
  אדום: '#b42318',
  כחול: '#1d4e89',
  תכלת: '#5b8fb8',
  ירוק: '#2f6b3a',
  צהוב: '#d4a017',
  חום: '#6b4423',
  בז: '#d8c7a3',
  "בז'": '#d8c7a3',
  זהב: '#c4a35a',
  בורדו: '#6d1a2a',
  כתום: '#c85a17',
  סגול: '#5a3d7a',
  ורוד: '#c97b8a',
  white: '#f3efe6',
  black: '#1c1c1c',
  silver: '#c7ccd2',
  gray: '#8a9098',
  grey: '#8a9098',
  red: '#b42318',
  blue: '#1d4e89',
  green: '#2f6b3a',
  yellow: '#d4a017',
  brown: '#6b4423',
  beige: '#d8c7a3',
  gold: '#c4a35a',
  orange: '#c85a17',
};
