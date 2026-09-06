export interface NavItem {
  id: string;
  to: string;
  labelKey: string;
  shortLabelKey?: string;
}

export interface AppShellMenuProps {
  isOpen: boolean;
  items: NavItem[];
  activeId: string;
  onClose: () => void;
  onNavigate: (to: string) => void;
}
