import { useTranslate } from '@forgedevstack/lingo/react';
import { SVG_EMPTY_PROPERTY, ZERO } from '@const';
import { ClmEmpty, ClmList, ClmPageHead, ClmRow } from '@common';
import { usePropertyState } from '@hooks';
import { addressSubtitle, addressTitle } from '../Property.utils';

export function PropertySaved() {
  const t = useTranslate();
  const { savedAddresses } = usePropertyState();

  if (savedAddresses.length === ZERO) {
    return (
      <div className="Bear-PropertySaved">
        <ClmPageHead title={t('propertySaved')} subtitle={t('pageSubPropertySaved')} />
        <ClmEmpty
          iconSrc={SVG_EMPTY_PROPERTY}
          title={t('propertySavedEmptyTitle')}
          body={t('propertySavedEmptyBody')}
        />
      </div>
    );
  }

  return (
    <div className="Bear-PropertySaved">
      <ClmPageHead title={t('propertySaved')} subtitle={t('pageSubPropertySaved')} />
      <ClmList>
        {savedAddresses.map((address) => (
          <ClmRow
            key={address.id}
            title={addressTitle(address)}
            subtitle={addressSubtitle(address, t('officialCity'))}
          />
        ))}
      </ClmList>
    </div>
  );
}
