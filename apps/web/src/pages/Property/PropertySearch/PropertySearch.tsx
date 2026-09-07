import { useState } from 'react';
import { Input } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { EMPTY_STRING, SVG_EMPTY_PROPERTY } from '@const';
import { ClmEmpty, ClmPageHead } from '@common';

export function PropertySearch() {
  const t = useTranslate();
  const [query, setQuery] = useState(EMPTY_STRING);

  return (
    <div className="Bear-PropertySearch">
      <ClmPageHead title={t('propertySearch')} subtitle={t('pageSubPropertySearch')} />
      <div className="Clm-discover">
        <Input
          label={t('propertySearchLabel')}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('propertySearchPlaceholder')}
          fullWidth
        />
      </div>
      <ClmEmpty
        iconSrc={SVG_EMPTY_PROPERTY}
        title={t('propertySearchEmptyTitle')}
        body={t('propertySearchEmptyBody')}
      />
    </div>
  );
}
