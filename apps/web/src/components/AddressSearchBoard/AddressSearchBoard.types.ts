import type { OfficialAddress } from '@clm/shared';

export interface AddressSearchBoardProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
  onLiveSearch?: (value: string) => void;
  onClear?: () => void;
  onPick?: (address: OfficialAddress) => void;
  suggestions?: OfficialAddress[];
  busy?: boolean;
  hint?: string;
  hideSubmit?: boolean;
  dealType?: string;
  onDealTypeChange?: (value: string) => void;
  dealOptions?: { value: string; label: string }[];
}

export interface AddressSuggestListProps {
  suggestions: OfficialAddress[];
  onPick: (address: OfficialAddress) => void;
}
