import {
  PRODUCT_ID_CAR,
  PRODUCT_ID_PROPERTY,
  ROUTE_CAR,
  ROUTE_PROPERTY,
  SVG_PRODUCT_CAR,
  SVG_PRODUCT_PROPERTY,
} from '@const';
import type { PlatformProduct } from './Platform.types';

export const PLATFORM_PRODUCTS: PlatformProduct[] = [
  {
    id: PRODUCT_ID_CAR,
    to: ROUTE_CAR,
    iconSrc: SVG_PRODUCT_CAR,
    titleKey: 'productCarTitle',
    bodyKey: 'productCarBody',
    ctaKey: 'productCarCta',
  },
  {
    id: PRODUCT_ID_PROPERTY,
    to: ROUTE_PROPERTY,
    iconSrc: SVG_PRODUCT_PROPERTY,
    titleKey: 'productPropertyTitle',
    bodyKey: 'productPropertyBody',
    ctaKey: 'productPropertyCta',
  },
];
