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

export interface LandingCategoryBarProps {
  id?: string;
  testId?: string;
  translate: (key: string) => string;
  onSelect: (categoryId: string) => void;
}

export interface LandingSearchProps {
  id?: string;
  testId?: string;
  label: string;
  placeholder: string;
  onSearch: (query: string) => void;
}

export interface LandingPathsProps {
  title: string;
  body: string;
  carTitle: string;
  carBody: string;
  carLabel: string;
  homeTitle: string;
  homeBody: string;
  existingLabel: string;
  interestLabel: string;
  onCar: () => void;
  onExisting: () => void;
  onInterest: () => void;
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

export type LandingDealType = 'all' | 'sale' | 'rent';
export type LandingListingDealType = 'sale' | 'rent';
export type LandingSortOption = 'new' | 'asc' | 'desc';
export type LandingPostKind = 'apt' | 'car';

export interface WebApartmentItem {
  id: string;
  cat: 'apt';
  deal: LandingListingDealType;
  city: string;
  street: string;
  rooms: number;
  size: number;
  floor: number;
  floors: number;
  price: number;
  feats: string[];
  isNew?: boolean;
  desc: string;
  imageUrl?: string;
  images?: string[];
  seller?: {
    name: string;
    type: string;
    since: string;
    phone: string;
  };
}

export interface WebCarItem {
  id: string;
  cat: 'car';
  maker: string;
  model: string;
  year: number;
  km: number;
  hand: number;
  fuel: string;
  gear: string;
  color: string;
  price: number;
  city: string;
  isNew?: boolean;
  desc: string;
  imageUrl?: string;
  images?: string[];
  seller?: {
    name: string;
    type: string;
    since: string;
    phone: string;
  };
}

export type WebListingItem = WebApartmentItem | WebCarItem;

export interface AptFilterState {
  deal: LandingDealType;
  city: string;
  rooms: number;
  max: string;
  feats: string[];
  sort: LandingSortOption;
}

export interface CarFilterState {
  maker: string;
  year: string;
  max: string;
  fuel: string;
  gear: string;
  sort: LandingSortOption;
}

export type ThemeChoice = 'light' | 'dark' | 'system';

export type LandingRoutePath =
  | 'home'
  | 'apartments'
  | 'cars'
  | 'item'
  | 'favorites'
  | 'generals'
  | 'post'
  | 'design';

export type ViewMode = 'gallery' | '360' | 'map';

export interface AddressSuggestion {
  city: string;
  street?: string;
}

export interface PostFormData {
  kind: LandingPostKind;
  street: string;
  city: string;
  deal: LandingListingDealType;
  price: string;
  rooms: string;
  size: string;
  maker: string;
  model: string;
  year: string;
  km: string;
  fuel: string;
  desc: string;
  terms: boolean;
  loading: boolean;
  priceError: boolean;
}

