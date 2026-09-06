import {
  PROVIDER_CELLO,
  PROVIDER_EASYPARK,
  PROVIDER_HIGHWAY_6,
  PROVIDER_HIGHWAY_6_NORTH,
  PROVIDER_INSURANCE,
  PROVIDER_PANGO,
} from '@const';

export const PROVIDER_MARK_SRC: Record<string, string> = {
  [PROVIDER_HIGHWAY_6]: '/providers/highway-6.svg',
  [PROVIDER_HIGHWAY_6_NORTH]: '/providers/highway-6-north.svg',
  [PROVIDER_PANGO]: '/providers/pango.svg',
  [PROVIDER_CELLO]: '/providers/cello.svg',
  [PROVIDER_EASYPARK]: '/providers/easypark.svg',
  [PROVIDER_INSURANCE]: '/providers/mandatory-insurance.svg',
};
