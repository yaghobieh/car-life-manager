import { useTranslate } from '@forgedevstack/lingo/react';
import { SVG_EMPTY_PROPERTY } from '@const';
import { ClmEmpty, ClmPageHead } from '@common';

export function PropertyHome() {
  const t = useTranslate();
  return (
    <div className="Bear-PropertyHome">
      <ClmPageHead title={t('propertyOverview')} subtitle={t('pageSubProperty')} />
      <ClmEmpty
        iconSrc={SVG_EMPTY_PROPERTY}
        title={t('propertyEmptyTitle')}
        body={t('propertyEmptyBody')}
      />
    </div>
  );
}
