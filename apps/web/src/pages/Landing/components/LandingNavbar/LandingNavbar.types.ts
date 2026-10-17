import type { LandingRoutePath, ThemeChoice } from '../../Landing.types';
import type React from 'react';

export interface LandingNavbarProps {
  routePath: LandingRoutePath;
  user: any;
  carsCount: number;
  apartmentsCount: number;
  favoritesCount: number;
  userMenuOpen: boolean;
  setUserMenuOpen: (open: boolean) => void;
  userMenuRef: React.RefObject<HTMLDivElement>;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  themeMode: ThemeChoice;
  cycleTheme: () => void;
  setLoginModalOpen: (open: boolean) => void;
  showToast: (msg: string) => void;
  goTo: (path: string) => void;
}
