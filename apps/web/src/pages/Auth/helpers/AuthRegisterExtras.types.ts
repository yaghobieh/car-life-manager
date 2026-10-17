import type { AreaPrice } from '@clm/shared';

export interface AuthRegisterExtrasProps {
  role: string;
  onRoleChange: (value: string) => void;
  city: string;
  onCityChange: (value: string) => void;
}

export type AuthAreaPrice = AreaPrice;
