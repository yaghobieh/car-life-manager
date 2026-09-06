export interface NavItem {
  id: string;
  to: string;
  labelKey: string;
  shortLabelKey?: string;
  group: string;
}

export interface SearchHit {
  id: string;
  kind: string;
  title: string;
  subtitle: string;
  to: string;
  vehicleId?: string;
}

export interface AppShellSearchProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export interface AppShellMenuProps {
  isOpen: boolean;
  items: NavItem[];
  activeId: string;
  onClose: () => void;
  onNavigate: (to: string) => void;
}
