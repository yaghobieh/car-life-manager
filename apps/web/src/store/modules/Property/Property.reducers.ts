import type { Lawyer, OfficialAddress, SavedAddress } from '@clm/shared';
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

export function propertyRefreshSucceeded(lawyers: Lawyer[], savedAddresses: SavedAddress[]) {
  return {
    lawyers,
    savedAddresses,
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

export function emptyPropertyState() {
  return {
    lawyers: [],
    savedAddresses: [],
    addresses: [],
    query: EMPTY_STRING,
    loading: BOOLEAN_FALSE,
    searching: BOOLEAN_FALSE,
    error: null,
    searchError: null,
  };
}
