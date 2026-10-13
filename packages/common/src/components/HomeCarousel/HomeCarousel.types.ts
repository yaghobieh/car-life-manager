import type { Home } from '@clm/shared';

export interface HomeCarouselProps {
  homes: Home[];
  onOpen: (home: Home) => void;
  id?: string;
}
