import { ZERO } from '../../constants/general.const';
import {
  CAT_APT,
  CAT_CAR,
  DEAL_ALL,
  DEAL_RENT,
  DEAL_SALE,
  FUELS_LIST,
  INITIAL_APARTMENTS,
  INITIAL_CARS,
  LOCALE_HE,
  MAX_SIMILAR_ITEMS,
  MIN_PRICE_THRESHOLD,
  PREFIX_APT_ID,
  PREFIX_CAR_ID,
  PRICE_MULTIPLIER_MILLION,
  PRICE_MULTIPLIER_THOUSAND,
  SORT_ASC,
  SORT_DESC,
} from './listings.const';
import type {
  AiSearchResult,
  AnyListing,
  ApartmentListing,
  CarListing,
  ListingFilterQuery,
  ListingInput,
} from './listings.types';
import { prepareApartmentListing, prepareCarListing } from './listings.utils';

type FilterPredicate<T> = (item: T, filters: ListingFilterQuery) => boolean;

function matchesSearch(...fields: (string | undefined)[]): boolean {
  const query = fields[fields.length - 1]?.trim().toLowerCase() ?? '';
  if (!query) return true;
  return fields.slice(0, -1).some((field) => field?.toLowerCase().includes(query));
}

const APT_FILTER_PREDICATES: FilterPredicate<ApartmentListing>[] = [
  (a, f) => !f.deal || f.deal === DEAL_ALL || a.deal === f.deal,
  (a, f) => !f.city || a.city === f.city,
  (a, f) => !f.rooms || f.rooms <= ZERO || a.rooms >= f.rooms,
  (a, f) => !f.max || f.max <= ZERO || a.price <= f.max,
  (a, f) => !f.feats || f.feats.length === ZERO || f.feats.every((feat) => a.feats.includes(feat)),
  (a, f) => !f.q || matchesSearch(a.city, a.street, a.desc, f.q),
];

const CAR_FILTER_PREDICATES: FilterPredicate<CarListing>[] = [
  (c, f) => !f.maker || c.maker === f.maker,
  (c, f) => !f.year || f.year <= ZERO || c.year >= f.year,
  (c, f) => !f.max || f.max <= ZERO || c.price <= f.max,
  (c, f) => !f.fuel || c.fuel === f.fuel,
  (c, f) => !f.gear || c.gear === f.gear,
  (c, f) => !f.city || c.city === f.city,
  (c, f) => !f.q || matchesSearch(c.maker, c.model, c.city, c.desc, f.q),
];

function applySorting<T extends { price: number }>(items: T[], sort?: ListingFilterQuery['sort']): T[] {
  switch (sort) {
    case SORT_ASC:
      return [...items].sort((a, b) => a.price - b.price);
    case SORT_DESC:
      return [...items].sort((a, b) => b.price - a.price);
    default:
      return items;
  }
}

class ListingsStore {
  private apartments: ApartmentListing[] = [...INITIAL_APARTMENTS];
  private cars: CarListing[] = [...INITIAL_CARS];

  public listApartments(filters: ListingFilterQuery = {}): ApartmentListing[] {
    const filtered = this.apartments.filter((apt) =>
      APT_FILTER_PREDICATES.every((predicate) => predicate(apt, filters))
    );
    return applySorting(filtered, filters.sort);
  }

  public listCars(filters: ListingFilterQuery = {}): CarListing[] {
    const filtered = this.cars.filter((car) =>
      CAR_FILTER_PREDICATES.every((predicate) => predicate(car, filters))
    );
    return applySorting(filtered, filters.sort);
  }

  public getById(id: string): { listing: AnyListing; similar: AnyListing[] } | null {
    const apt = this.apartments.find((a) => a.id === id);
    if (apt) {
      const similar = this.apartments.filter((a) => a.id !== id).slice(ZERO, MAX_SIMILAR_ITEMS);
      return { listing: apt, similar };
    }
    const car = this.cars.find((c) => c.id === id);
    if (car) {
      const similar = this.cars.filter((c) => c.id !== id).slice(ZERO, MAX_SIMILAR_ITEMS);
      return { listing: car, similar };
    }
    return null;
  }

  public createListing(input: ListingInput): AnyListing {
    const isCar = input.cat === CAT_CAR || Boolean(input.maker);
    const prefix = isCar ? PREFIX_CAR_ID : PREFIX_APT_ID;
    const id = `${prefix}${Date.now()}`;

    if (isCar) {
      const car = prepareCarListing(input, id);
      this.cars.unshift(car);
      return car;
    }

    const apt = prepareApartmentListing(input, id);
    this.apartments.unshift(apt);
    return apt;
  }

  public getCities(): string[] {
    const cities = new Set<string>();
    this.apartments.forEach((a) => cities.add(a.city));
    this.cars.forEach((c) => cities.add(c.city));
    return Array.from(cities).sort((a, b) => a.localeCompare(b, LOCALE_HE));
  }

  public getMakers(): string[] {
    const makers = new Set<string>();
    this.cars.forEach((c) => makers.add(c.maker));
    return Array.from(makers).sort((a, b) => a.localeCompare(b, LOCALE_HE));
  }

  public aiSearch(rawQuery: string): AiSearchResult {
    const q = rawQuery.trim();
    const makers = this.getMakers();
    const cities = this.getCities();

    const matchedMaker = makers.find((m) => q.includes(m));
    const isCar = Boolean(matchedMaker) || /רכב|מכונית|יד\s?\d|ק״מ|חשמלי|היברידי/.test(q);

    let maxPrice: number | undefined;
    const priceMatch = q.match(/עד\s*([\d.,]+)\s*(מיליון|אלף)?/);
    if (priceMatch) {
      let num = parseFloat(priceMatch[1].replace(/,/g, ''));
      if (priceMatch[2] === 'מיליון') num *= PRICE_MULTIPLIER_MILLION;
      else if (priceMatch[2] === 'אלף') num *= PRICE_MULTIPLIER_THOUSAND;
      if (num >= MIN_PRICE_THRESHOLD) maxPrice = Math.round(num);
    }

    const matchedFuel = FUELS_LIST.find((f) => q.includes(f));
    const matchedCity = cities.find((c) => q.includes(c));

    let rooms: number | undefined;
    const roomsMatch = q.match(/(\d(?:\.5)?)\s*חדרים/);
    if (roomsMatch) {
      rooms = Math.floor(parseFloat(roomsMatch[1]));
    }

    let deal: typeof DEAL_SALE | typeof DEAL_RENT | undefined;
    if (/להשכרה|שכירות|לשכור/.test(q)) deal = DEAL_RENT;
    else if (/למכירה|לקנות|קנייה/.test(q)) deal = DEAL_SALE;

    if (isCar) {
      const cars = this.listCars({
        maker: matchedMaker,
        max: maxPrice,
        fuel: matchedFuel,
        city: matchedCity,
      });
      return {
        query: rawQuery,
        detectedCategory: CAT_CAR,
        parsedFilters: { maker: matchedMaker, maxPrice, fuel: matchedFuel, city: matchedCity },
        apartments: [],
        cars,
      };
    }

    const apartments = this.listApartments({
      city: matchedCity,
      rooms,
      deal,
      max: maxPrice,
    });
    return {
      query: rawQuery,
      detectedCategory: CAT_APT,
      parsedFilters: { city: matchedCity, rooms, deal, maxPrice },
      apartments,
      cars: [],
    };
  }
}

export const listingsStore = new ListingsStore();
