import { useTranslate } from '@forgedevstack/lingo/react';
import type { OfficialAddress } from '@clm/shared';
import { suggestSubtitle, suggestTitle } from './AddressSearchBoard.utils';
import type { AddressSuggestListProps } from './AddressSearchBoard.types';

export function AddressSuggestList(props: AddressSuggestListProps) {
  const { suggestions, onPick } = props;
  const t = useTranslate();

  return (
    <ul className="Clm-live-list" role="listbox">
      {suggestions.map((address: OfficialAddress) => (
        <li key={address.id}>
          <button type="button" className="Clm-suggest-item" onClick={() => onPick(address)}>
            <span className="Clm-suggest-title">{suggestTitle(address)}</span>
            <span className="Clm-suggest-sub">{suggestSubtitle(address, t('officialCity'))}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
