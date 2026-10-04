export interface NavItem {
  id: string;
  to: string;
  labelKey: string;
  shortLabelKey?: string;
  group: string;
  iconSrc: string;
}

export interface AppShellSidebarProps {
  groups: Array<{ id: string; label: string; items: NavItem[] }>;
  activeId: string;
  onNavigate: (to: string) => void;
  footer: string;
  brandLead: string;
  brandAccent: string;
  brandMark: string;
  tagline: string;
  onBrandClick: () => void;
  productsLabel: string;
  onProductsClick: () => void;
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
  productsLabel?: string;
  onProductsClick?: () => void;
}
