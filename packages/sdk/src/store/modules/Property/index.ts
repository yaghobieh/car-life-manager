import { createNucleus } from '@forgedevstack/synapse';
import { api } from '@api';
import { BOOLEAN_FALSE, BOOLEAN_TRUE, EMPTY_STRING } from '@const';
import { logger } from '@logger';
import { PROPERTY_NUCLEUS_NAME } from './Property.consts';
import {
  addressSearchCleared,
  addressSearchFailed,
  addressSearchSucceeded,
  areaPriceSearchFailed,
  areaPriceSearchSucceeded,
  beginAddressSearch,
  beginAreaPriceSearch,
  beginPropertyRefresh,
  propertyRefreshFailed,
  propertyRefreshSucceeded,
} from './Property.reducers';
import type { PropertyNucleusState } from './Property.types';

const bootstrap = { started: BOOLEAN_FALSE };

export const propertyNucleus = createNucleus<PropertyNucleusState>(
  (set) => ({
    lawyers: [],
    savedAddresses: [],
    homes: [],
    expenses: [],
    addresses: [],
    areaPrices: [],
    query: EMPTY_STRING,
    loading: BOOLEAN_TRUE,
    searching: BOOLEAN_FALSE,
    areaSearching: BOOLEAN_FALSE,
    error: null,
    searchError: null,
    areaSearchError: null,
    refresh: async () => {
      set(beginPropertyRefresh());
      try {
        const [lawyersPayload, savedPayload, homesPayload, expensesPayload] = await Promise.all([
          api.listLawyers(),
          api.listSavedAddresses(),
          api.listHomes(),
          api.listPropertyExpenses(),
        ]);
        set(propertyRefreshSucceeded(
          lawyersPayload.lawyers,
          savedPayload.addresses,
          homesPayload.homes,
          expensesPayload.expenses,
        ));
      } catch (err) {
        logger.error(err);
        set(propertyRefreshFailed(err instanceof Error ? err.message : String(err)));
      }
    },
    search: async (query: string) => {
      set(beginAddressSearch(query));
      try {
        const payload = await api.searchAddresses(query);
        set(addressSearchSucceeded(payload.addresses));
      } catch (err) {
        logger.error(err);
        set(addressSearchFailed(err instanceof Error ? err.message : String(err)));
      }
    },
    searchAreaPrices: async (query: string) => {
      set(beginAreaPriceSearch());
      try {
        const payload = await api.searchAreaPrices(query);
        set(areaPriceSearchSucceeded(payload.prices));
      } catch (err) {
        logger.error(err);
        set(areaPriceSearchFailed(err instanceof Error ? err.message : String(err)));
      }
    },
    clearSearch: () => {
      set(addressSearchCleared());
    },
    addLawyer: async (input) => {
      await api.addLawyer(input);
      const payload = await api.listLawyers();
      set({ lawyers: payload.lawyers });
    },
    saveAddress: async (input) => {
      await api.saveAddress(input);
      const payload = await api.listSavedAddresses();
      set({ savedAddresses: payload.addresses });
    },
    addHome: async (input) => {
      await api.addHome(input);
      const payload = await api.listHomes();
      set({ homes: payload.homes });
    },
    addPropertyExpense: async (input) => {
      await api.addPropertyExpense(input);
      const payload = await api.listPropertyExpenses();
      set({ expenses: payload.expenses });
    },
  }),
  { devtoolsName: PROPERTY_NUCLEUS_NAME },
);

export function bootstrapPropertyStore() {
  if (bootstrap.started) return;
  bootstrap.started = BOOLEAN_TRUE;
  void propertyNucleus.get().refresh();
}

export type { PropertyNucleusState } from './Property.types';
