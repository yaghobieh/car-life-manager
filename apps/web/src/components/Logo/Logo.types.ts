import type { LOGO_PRODUCT_CAR, LOGO_PRODUCT_PLATFORM, LOGO_PRODUCT_PROPERTY } from '@const';

export type LogoProduct =
  | typeof LOGO_PRODUCT_PLATFORM
  | typeof LOGO_PRODUCT_CAR
  | typeof LOGO_PRODUCT_PROPERTY;

export interface LogoProps {
  compact?: boolean;
  onDark?: boolean;
  product?: LogoProduct;
}
