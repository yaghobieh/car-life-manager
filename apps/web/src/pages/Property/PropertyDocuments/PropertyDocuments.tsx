import { useTranslate } from '@forgedevstack/lingo/react';
import { SVG_EMPTY_PROPERTY } from '@const';
import { ClmEmpty, ClmPageHead } from '@common';

export function PropertyDocuments() {
  const t = useTranslate();
  return (
    <div className="Bear-PropertyDocuments">
      <ClmPageHead title={t('propertyDocuments')} subtitle={t('pageSubPropertyDocuments')} />
      <ClmEmpty
        iconSrc={SVG_EMPTY_PROPERTY}
        title={t('propertyDocumentsEmptyTitle')}
        body={t('propertyDocumentsEmptyBody')}
      />
    </div>
  );
}
