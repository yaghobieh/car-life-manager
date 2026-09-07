import type { Lawyer, LawyerInput, OfficialAddress, SavedAddress, SavedAddressInput } from '@clm/shared';

export interface PropertyNucleusState {
  lawyers: Lawyer[];
  savedAddresses: SavedAddress[];
  addresses: OfficialAddress[];
  query: string;
  loading: boolean;
  searching: boolean;
  error: string | null;
  searchError: string | null;
  refresh: () => Promise<void>;
  search: (query: string) => Promise<void>;
  addLawyer: (input: LawyerInput) => Promise<void>;
  saveAddress: (input: SavedAddressInput) => Promise<void>;
}
