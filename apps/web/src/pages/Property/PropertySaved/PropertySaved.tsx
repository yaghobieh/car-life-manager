import { useTranslate } from '@forgedevstack/lingo/react';
import { SVG_EMPTY_PROPERTY } from '@const';
import { ClmEmpty, ClmPageHead } from '@common';

export function PropertySaved() {
  const t = useTranslate();
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
