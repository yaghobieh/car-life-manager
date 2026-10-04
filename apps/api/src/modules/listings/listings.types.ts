export type ListingCategory = 'apt' | 'car';
export type ApartmentDeal = 'sale' | 'rent';

export interface ApartmentListing {
  id: string;
  cat: 'apt';
  deal: ApartmentDeal;
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

export interface CarListing {
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

export type AnyListing = ApartmentListing | CarListing;

export interface ListingInput {
  cat?: ListingCategory;
  deal?: ApartmentDeal;
  city?: string;
  street?: string;
  rooms?: number;
  size?: number;
  floor?: number;
  floors?: number;
  price?: number;
  feats?: string[];
  maker?: string;
  model?: string;
  year?: number;
  km?: number;
  hand?: number;
  fuel?: string;
  gear?: string;
  color?: string;
  desc?: string;
  imageUrl?: string;
  images?: string[];
  seller?: {
    name?: string;
    type?: string;
    since?: string;
    phone?: string;
  };
}

export interface ListingFilterQuery {
  cat?: ListingCategory | 'all';
  deal?: ApartmentDeal | 'all';
  city?: string;
  rooms?: number;
  max?: number;
  maker?: string;
  year?: number;
  fuel?: string;
  gear?: string;
  feats?: string[];
  sort?: 'new' | 'asc' | 'desc';
  q?: string;
}

export interface AiSearchResult {
  query: string;
  detectedCategory: ListingCategory | 'all';
  parsedFilters: {
    city?: string;
    maker?: string;
    maxPrice?: number;
    rooms?: number;
    deal?: ApartmentDeal;
    fuel?: string;
  };
  apartments: ApartmentListing[];
  cars: CarListing[];
}
