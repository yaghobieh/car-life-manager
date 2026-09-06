import type { LANDING_FEATURES, LANDING_STEPS } from './Landing.const';

export type LandingStep = (typeof LANDING_STEPS)[number];
export type LandingFeatureKey = (typeof LANDING_FEATURES)[number];

export interface LandingLoadingProps {
  label: string;
}
