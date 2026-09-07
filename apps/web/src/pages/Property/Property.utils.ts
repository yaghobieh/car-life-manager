import type { OfficialAddress, SavedAddress } from '@clm/shared';
import { ADDRESS_KIND_STREET, EMPTY_STRING, SUBTITLE_SEPARATOR } from '@const';

export function addressTitle(address: OfficialAddress | SavedAddress): string {
  if ('kind' in address && address.kind === ADDRESS_KIND_STREET && address.street) {
    return address.street;
  }
  return address.street || address.city;
}

export function addressSubtitle(
  address: OfficialAddress | SavedAddress,
  cityLabel: string,
): string {
  const parts = [address.city, address.region].filter(Boolean);
  if (!parts.length) return cityLabel;
  return parts.join(SUBTITLE_SEPARATOR);
}

export function savedAddressKey(address: SavedAddress): string {
  return [address.cityCode ?? EMPTY_STRING, address.streetCode ?? address.street ?? address.city].join('-');
}
