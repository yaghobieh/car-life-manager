import { DATE_SLICE_LENGTH, ONBOARDING_STEP_PLATE, ONBOARDING_STEP_WELCOME, TITLE_SEPARATOR, ZERO } from '@const';

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
