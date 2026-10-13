import type {
  AreaPrice,
  Home,
  HomeInput,
  Lawyer,
  LawyerInput,
  OfficialAddress,
  PropertyExpense,
  PropertyExpenseInput,
  SavedAddress,
  SavedAddressInput,
} from '@clm/shared';

export interface PropertyNucleusState {
  lawyers: Lawyer[];
  savedAddresses: SavedAddress[];
  homes: Home[];
  expenses: PropertyExpense[];
  addresses: OfficialAddress[];
  areaPrices: AreaPrice[];
  query: string;
  loading: boolean;
  searching: boolean;
  areaSearching: boolean;
  error: string | null;
  searchError: string | null;
  areaSearchError: string | null;
  refresh: () => Promise<void>;
  search: (query: string) => Promise<void>;
  searchAreaPrices: (query: string) => Promise<void>;
  clearSearch: () => void;
  addLawyer: (input: LawyerInput) => Promise<void>;
  saveAddress: (input: SavedAddressInput) => Promise<void>;
  addHome: (input: HomeInput) => Promise<void>;
  addPropertyExpense: (input: PropertyExpenseInput) => Promise<void>;
}
