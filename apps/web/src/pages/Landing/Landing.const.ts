import {
  BOOLEAN_TRUE,
  PRODUCT_ID_CAR,
  PRODUCT_ID_PROPERTY,
  PROPERTY_PRODUCT_ENABLED,
  ROUTE_CAR,
  ROUTE_PROPERTY,
  SVG_PRODUCT_CAR,
  SVG_PRODUCT_PROPERTY,
} from '@const';

export const LANDING_STEPS = [
  { step: '1', labelKey: 'howStep1' },
  { step: '2', labelKey: 'howStep2' },
  { step: '3', labelKey: 'howStep3' },
] as const;

export const LANDING_FEATURES = [
  'tasks',
  'documents',
  'services',
  'expenses',
  'maintenance',
  'reminders',
] as const;

export const LANDING_PRODUCTS = [
  {
    id: PRODUCT_ID_CAR,
    to: ROUTE_CAR,
    iconSrc: SVG_PRODUCT_CAR,
    titleKey: 'productCarTitle',
    bodyKey: 'productCarBody',
    ctaKey: 'productCarCta',
    enabled: BOOLEAN_TRUE,
  },
  {
    id: PRODUCT_ID_PROPERTY,
    to: ROUTE_PROPERTY,
    iconSrc: SVG_PRODUCT_PROPERTY,
    titleKey: 'productPropertyTitle',
    bodyKey: 'productPropertyBody',
    ctaKey: PROPERTY_PRODUCT_ENABLED ? 'productPropertyCta' : 'productPropertySoon',
    enabled: PROPERTY_PRODUCT_ENABLED,
  },
];
