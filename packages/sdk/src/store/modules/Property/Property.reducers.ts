import type { AreaPrice, Home, Lawyer, OfficialAddress, PropertyExpense, SavedAddress } from '@clm/shared';
import { BOOLEAN_FALSE, BOOLEAN_TRUE, EMPTY_STRING } from '@const';

export function beginPropertyRefresh() {
  return { loading: BOOLEAN_TRUE, error: null };
}

export function beginAddressSearch(query: string) {
  return { searching: BOOLEAN_TRUE, query, searchError: null };
}

export function propertyRefreshFailed(message: string) {
  return { loading: BOOLEAN_FALSE, error: message };
}

export function propertyRefreshSucceeded(
  lawyers: Lawyer[],
  savedAddresses: SavedAddress[],
  homes: Home[],
  expenses: PropertyExpense[],
) {
  return {
    lawyers,
    savedAddresses,
    homes,
    expenses,
    loading: BOOLEAN_FALSE,
    error: null,
  };
}

export function addressSearchSucceeded(addresses: OfficialAddress[]) {
  return { addresses, searching: BOOLEAN_FALSE, searchError: null };
}

export function addressSearchFailed(message: string) {
  return { addresses: [], searching: BOOLEAN_FALSE, searchError: message };
}

export function addressSearchCleared() {
  return {
    addresses: [],
    areaPrices: [],
    searching: BOOLEAN_FALSE,
    areaSearching: BOOLEAN_FALSE,
    searchError: null,
    areaSearchError: null,
  };
}

export function beginAreaPriceSearch() {
  return { areaSearching: BOOLEAN_TRUE, areaSearchError: null };
}

export function areaPriceSearchSucceeded(areaPrices: AreaPrice[]) {
  return { areaPrices, areaSearching: BOOLEAN_FALSE, areaSearchError: null };
}

export function areaPriceSearchFailed(message: string) {
  return { areaPrices: [], areaSearching: BOOLEAN_FALSE, areaSearchError: message };
}

export function emptyPropertyState() {
  return {
    lawyers: [],
    savedAddresses: [],
    homes: [],
    expenses: [],
    addresses: [],
    areaPrices: [],
    query: EMPTY_STRING,
    loading: BOOLEAN_FALSE,
    searching: BOOLEAN_FALSE,
    areaSearching: BOOLEAN_FALSE,
    error: null,
    searchError: null,
    areaSearchError: null,
  };
}
