import { DATE_SLICE_LENGTH, ONBOARDING_STEP_PLATE, ONBOARDING_STEP_WELCOME, TITLE_SEPARATOR, ZERO } from '@const';
import { ADD_VEHICLE_FAILED_KEY, PLATE_TAKEN_CODE, PLATE_TAKEN_KEY } from './Onboarding.const';

export function addVehicleErrorKey(code?: string): string {
  return code === PLATE_TAKEN_CODE ? PLATE_TAKEN_KEY : ADD_VEHICLE_FAILED_KEY;
}

export function sliceDate(value: string | null | undefined, unknownLabel: string): string {
  return value?.slice(ZERO, DATE_SLICE_LENGTH) ?? unknownLabel;
}

export function lookupTitle(make: string | null, model: string | null, year: number | null, unknownLabel: string): string {
  return [make, model, year].filter(Boolean).join(TITLE_SEPARATOR) || unknownLabel;
}

export function resolveOnboardingStep(step: number, hasVehicles: boolean): number {
  if (step === ONBOARDING_STEP_WELCOME && hasVehicles) return ONBOARDING_STEP_PLATE;
  return step;
}
