import type { OfficialAddress } from '@clm/shared';
import { ADDRESS_KIND_STREET, SUBTITLE_SEPARATOR } from '@const';

export function suggestTitle(address: OfficialAddress): string {
  if (address.kind === ADDRESS_KIND_STREET && address.street) return address.street;
  return address.street || address.city;
}

export function suggestSubtitle(address: OfficialAddress, cityLabel: string): string {
  const parts = [address.city, address.region].filter(Boolean);
  if (!parts.length) return cityLabel;
  return parts.join(SUBTITLE_SEPARATOR);
}
