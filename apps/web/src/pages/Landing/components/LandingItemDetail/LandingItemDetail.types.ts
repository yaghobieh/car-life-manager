import type { ViewMode, WebListingItem } from '../../Landing.types';

export interface LandingItemDetailProps {
  item: WebListingItem;
  aptViewMode: ViewMode;
  setAptViewMode: (mode: ViewMode) => void;
  selectedGalleryThumb: number;
  setSelectedGalleryThumb: (thumb: number) => void;
  view360Angle: number;
  setView360Angle: (angle: number | ((prev: number) => number)) => void;
  autoRotate360: boolean;
  toggleAutoRotate360: () => void;
  rotate360Left: () => void;
  rotate360Right: () => void;
  phoneRevealed: boolean;
  setPhoneRevealed: (revealed: boolean) => void;
  setContactModalOpen: (open: boolean) => void;
  onNavigate: (path: string) => void;
  showToast: (msg: string) => void;
}
