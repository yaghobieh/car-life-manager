import { describe, expect, it } from 'vitest';
import { VEHICLE_IMAGE_DEFAULT, VEHICLE_IMAGE_KIA } from '@const';
import { vehicleImageSrc, vehiclePaintHex } from './CarArt.utils';

describe('vehicleImageSrc', () => {
  it('uses the Kia photo for official MOT make names', () => {
    expect(vehicleImageSrc('קיה סלובקיה')).toBe(VEHICLE_IMAGE_KIA);
    expect(vehicleImageSrc('Kia')).toBe(VEHICLE_IMAGE_KIA);
  });

  it('maps official MOT color names to paint', () => {
    expect(vehiclePaintHex('לבן')).toBe('#f3efe6');
    expect(vehiclePaintHex('שחור מטאלי')).toBe('#1c1c1c');
    expect(vehiclePaintHex(null)).toBe(null);
  });

  it('falls back to our default photo when the make is unknown', () => {
    expect(vehicleImageSrc(null)).toBe(VEHICLE_IMAGE_DEFAULT);
    expect(vehicleImageSrc('Unknown Maker')).toBe(VEHICLE_IMAGE_DEFAULT);
  });
});
