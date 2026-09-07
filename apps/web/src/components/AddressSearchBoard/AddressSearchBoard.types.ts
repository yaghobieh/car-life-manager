export interface AddressSearchBoardProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
  busy?: boolean;
  hint?: string;
}
