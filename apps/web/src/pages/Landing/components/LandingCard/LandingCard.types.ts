import type { WebListingItem } from '../../Landing.types';

export interface LandingCardProps {
  item: WebListingItem;
  isFav?: boolean;
  onToggleFav?: (id: string) => void;
  onNavigate?: (path: string) => void;
  preview?: boolean;
}
