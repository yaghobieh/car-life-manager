import type { Home, OfficialAddress, SavedAddress } from '@clm/shared';
import {
  ADDRESS_KIND_STREET,
  CSV_SEPARATOR,
  DATE_SLICE_LENGTH,
  EMPTY_STRING,
  FILTER_ALL,
  MONTH_KEY_LENGTH,
  PRICE_WITH,
  PRICE_WITHOUT,
  ROUTE_PROPERTY_HOMES,
  SPACE,
  SUBTITLE_SEPARATOR,
  YEAR_KEY_LENGTH,
  ZERO,
} from '@const';
import { listedByFromFeatures } from '@components/HomeCard/HomeCard.utils';
import type { HomeBoardFilter } from './Property.types';

export function addressTitle(address: OfficialAddress | SavedAddress): string {
  if ('kind' in address && address.kind === ADDRESS_KIND_STREET && address.street) {
    return address.street;
  }
  return address.street || address.city;
}

export function addressSubtitle(
  address: OfficialAddress | SavedAddress,
  cityLabel: string,
): string {
  const parts = [address.city, address.region].filter(Boolean);
  if (!parts.length) return cityLabel;
  return parts.join(SUBTITLE_SEPARATOR);
}

export function savedAddressKey(address: SavedAddress): string {
  return [address.cityCode ?? EMPTY_STRING, address.streetCode ?? address.street ?? address.city].join('-');
}

export function parseCsvList(value: string): string[] {
  return value.split(CSV_SEPARATOR).map((item) => item.trim()).filter(Boolean);
}

export {
  featureLabelKey,
  homeAddress,
  homeHasFeature,
  homeMeta,
  listedByFromFeatures,
  mergeHomeFeatures,
} from '@components/HomeCard/HomeCard.utils';

export function filterHomes(homes: Home[], filter: string): Home[] {
  if (filter === FILTER_ALL) return homes;
  return homes.filter((home) => home.dealType === filter);
}

export function filterHomesBoard(homes: Home[], filter: HomeBoardFilter): Home[] {
  return homes.filter((home) => {
    if (filter.deal !== FILTER_ALL && home.dealType !== filter.deal) return false;
    if (filter.listedBy !== FILTER_ALL && listedByFromFeatures(home.features) !== filter.listedBy) {
      return false;
    }
    if (filter.price === PRICE_WITH && home.price === null) return false;
    if (filter.price === PRICE_WITHOUT && home.price !== null) return false;
    if (
      filter.city
      && !home.city.includes(filter.city)
      && !(home.neighborhood ?? EMPTY_STRING).includes(filter.city)
      && !(home.street ?? EMPTY_STRING).includes(filter.city)
    ) {
      return false;
    }
    if (filter.street && !(home.street ?? EMPTY_STRING).includes(filter.street)) return false;
    return true;
  });
}

export function homeDetailPath(homeId: string): string {
  return `${ROUTE_PROPERTY_HOMES}/${homeId}`;
}

export function dueHomes(homes: Home[]): Home[] {
  return homes
    .filter((home) => Boolean(home.nextDueDate))
    .sort((left, right) => (left.nextDueDate ?? EMPTY_STRING).localeCompare(right.nextDueDate ?? EMPTY_STRING));
}

export function isOverdue(dueDate: string, today: string): boolean {
  return dueDate < today;
}

export function todayIso(): string {
  return new Date().toISOString().slice(ZERO, DATE_SLICE_LENGTH);
}

export function lawyerInitials(name: string): string {
  const parts = name.trim().split(SPACE).filter(Boolean);
  if (parts.length > 1) return `${parts[0][0]}.${parts[1][0]}`;
  return name.trim().slice(ZERO, 2);
}

export function monthExpenseTotal(expenses: { amount: number; occurredAt: string }[], monthKey: string): number {
  return expenses
    .filter((expense) => expense.occurredAt.slice(ZERO, MONTH_KEY_LENGTH) === monthKey)
    .reduce((sum, expense) => sum + expense.amount, ZERO);
}

export function yearExpenseTotal(expenses: { amount: number; occurredAt: string }[], yearKey: string): number {
  return expenses
    .filter((expense) => expense.occurredAt.slice(ZERO, YEAR_KEY_LENGTH) === yearKey)
    .reduce((sum, expense) => sum + expense.amount, ZERO);
}

export function currentMonthKey(): string {
  return new Date().toISOString().slice(ZERO, MONTH_KEY_LENGTH);
}

export function currentYearKey(): string {
  return new Date().toISOString().slice(ZERO, YEAR_KEY_LENGTH);
}

export function topExpenseCategory(expenses: { category: string; amount: number }[]): string | null {
  if (!expenses.length) return null;
  const totals = new Map<string, number>();
  expenses.forEach((expense) => {
    totals.set(expense.category, (totals.get(expense.category) ?? ZERO) + expense.amount);
  });
  let top: string | null = null;
  let max = ZERO;
  totals.forEach((amount, category) => {
    if (amount >= max) {
      top = category;
      max = amount;
    }
  });
  return top;
}
