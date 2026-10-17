import type { AreaPrice } from '@clm/shared';

export interface AreaPriceListProps {
  prices: AreaPrice[];
  error?: string | null;
  busy?: boolean;
  id?: string;
}
