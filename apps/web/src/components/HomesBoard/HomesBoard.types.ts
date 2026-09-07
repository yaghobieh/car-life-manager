import type { Home } from '@clm/shared';

export interface HomesBoardProps {
  homes: Home[];
  dealFilter: string;
  city: string;
  street: string;
  id?: string;
}
