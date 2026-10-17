import type { Home } from '@clm/shared';

export interface HomeCardProps {
  home: Home;
  onOpen?: (home: Home) => void;
  id?: string;
  testId?: string;
}

export interface HomeCardMediaProps {
  home: Home;
  view: string;
  imageIndex: number;
  onPrev: () => void;
  onNext: () => void;
}
