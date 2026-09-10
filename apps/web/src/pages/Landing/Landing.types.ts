import type { LANDING_FEATURES, LANDING_STEPS } from './Landing.const';

export type LandingStep = (typeof LANDING_STEPS)[number];
export type LandingFeatureKey = (typeof LANDING_FEATURES)[number];

export interface LandingLoadingProps {
  label: string;
}

export interface LandingHowProps {
  title: string;
  translate: (key: string) => string;
}

export interface LandingFeaturesProps {
  title: string;
  translate: (key: string) => string;
}

export interface LandingSecondaryCtaProps {
  hidden: boolean;
  label: string;
  onClick: () => void;
}

export interface LandingProductsProps {
  title: string;
  onOpen: (to: string) => void;
}

export interface LandingProduct {
  id: string;
  to: string;
  iconSrc: string;
  titleKey: string;
  bodyKey: string;
  ctaKey: string;
  enabled: boolean;
}

export interface LandingProductCardProps {
  id?: string;
  testId?: string;
  product: LandingProduct;
  onOpen: (to: string) => void;
}

export interface LandingProductOpenButtonProps {
  id?: string;
  testId?: string;
  label: string;
  to: string;
  onOpen: (to: string) => void;
}

export interface LandingProductDisabledNoteProps {
  id?: string;
  testId?: string;
  label: string;
  note: string;
}

export interface LandingProductActionProps {
  enabled: boolean;
  label: string;
  note: string;
  to: string;
  onOpen: (to: string) => void;
}
