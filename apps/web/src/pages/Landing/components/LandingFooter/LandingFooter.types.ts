export interface LandingFooterProps {
  onNavigate: (path: string) => void;
  onSetAptDealFilter: (deal: 'sale' | 'rent') => void;
  onSetCarFuelFilter: (fuel: string) => void;
  onShowToast: (msg: string) => void;
}
