import { EMPTY_STRING, ZERO } from '../../constants/general.const';
import {
  CAT_APT,
  CAT_CAR,
  DEAL_RENT,
  DEAL_SALE,
  DEFAULT_APT_FEATS,
  DEFAULT_CAR_COLOR,
  DEFAULT_CAR_FUEL,
  DEFAULT_CAR_GEAR,
  DEFAULT_CAR_MAKER,
  DEFAULT_CAR_MODEL,
  DEFAULT_CITY,
  DEFAULT_FLOOR,
  DEFAULT_FLOORS,
  DEFAULT_HAND,
  DEFAULT_ROOMS,
  DEFAULT_SELLER_NAME,
  DEFAULT_SELLER_PHONE,
  DEFAULT_SIZE,
  DEFAULT_STREET,
  FEATS_DELIMITER,
  SELLER_TYPE_PRIVATE,
  SELLER_TYPE_PRIVATE_POSTER,
} from './listings.const';
import type { ApartmentListing, CarListing, ListingFilterQuery, ListingInput } from './listings.types';

export function parseListingFilterQuery(query: Record<string, unknown>): ListingFilterQuery {
  const featsStr = typeof query.feats === 'string' ? query.feats : undefined;
  return {
    cat: query.cat as ListingFilterQuery['cat'],
    deal: query.deal as ListingFilterQuery['deal'],
    city: typeof query.city === 'string' ? query.city : undefined,
    rooms: query.rooms ? Number(query.rooms) : undefined,
    max: query.max ? Number(query.max) : undefined,
    maker: typeof query.maker === 'string' ? query.maker : undefined,
    year: query.year ? Number(query.year) : undefined,
    fuel: typeof query.fuel === 'string' ? query.fuel : undefined,
    gear: typeof query.gear === 'string' ? query.gear : undefined,
    feats: featsStr ? featsStr.split(FEATS_DELIMITER) : undefined,
    sort: query.sort as ListingFilterQuery['sort'],
    q: typeof query.q === 'string' ? query.q : undefined,
  };
}

export function prepareCarListing(input: ListingInput, id: string): CarListing {
  const currentYear = new Date().getFullYear();
  return {
    id,
    cat: CAT_CAR,
    maker: input.maker ?? DEFAULT_CAR_MAKER,
    model: input.model ?? DEFAULT_CAR_MODEL,
    year: Number(input.year) || currentYear,
    km: Number(input.km) || ZERO,
    hand: Number(input.hand) || DEFAULT_HAND,
    fuel: input.fuel ?? DEFAULT_CAR_FUEL,
    gear: input.gear ?? DEFAULT_CAR_GEAR,
    color: input.color ?? DEFAULT_CAR_COLOR,
    price: Number(input.price) || ZERO,
    city: input.city ?? DEFAULT_CITY,
    isNew: true,
    desc: input.desc ?? EMPTY_STRING,
    seller: {
      name: input.seller?.name ?? DEFAULT_SELLER_NAME,
      type: SELLER_TYPE_PRIVATE,
      since: String(currentYear),
      phone: input.seller?.phone ?? DEFAULT_SELLER_PHONE,
    },
  };
}

export function prepareApartmentListing(input: ListingInput, id: string): ApartmentListing {
  const currentYear = new Date().getFullYear();
  return {
    id,
    cat: CAT_APT,
    deal: input.deal === DEAL_RENT ? DEAL_RENT : DEAL_SALE,
    city: input.city ?? DEFAULT_CITY,
    street: input.street ?? DEFAULT_STREET,
    rooms: Number(input.rooms) || DEFAULT_ROOMS,
    size: Number(input.size) || DEFAULT_SIZE,
    floor: Number(input.floor) || DEFAULT_FLOOR,
    floors: Number(input.floors) || DEFAULT_FLOORS,
    price: Number(input.price) || ZERO,
    feats: Array.isArray(input.feats) ? input.feats : [...DEFAULT_APT_FEATS],
    isNew: true,
    desc: input.desc ?? EMPTY_STRING,
    seller: {
      name: input.seller?.name ?? DEFAULT_SELLER_NAME,
      type: SELLER_TYPE_PRIVATE_POSTER,
      since: String(currentYear),
      phone: input.seller?.phone ?? DEFAULT_SELLER_PHONE,
    },
  };
}
