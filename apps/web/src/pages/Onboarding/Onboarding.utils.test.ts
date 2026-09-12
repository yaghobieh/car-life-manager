import { describe, expect, it } from 'vitest';
import { ADD_VEHICLE_FAILED_KEY, PLATE_TAKEN_KEY } from './Onboarding.const';
import { addVehicleErrorKey } from './Onboarding.utils';

describe('addVehicleErrorKey', () => {
  it('blocks a plate already claimed by another account', () => {
    expect(addVehicleErrorKey('plate_taken')).toBe(PLATE_TAKEN_KEY);
    expect(addVehicleErrorKey('unavailable')).toBe(ADD_VEHICLE_FAILED_KEY);
  });
});
