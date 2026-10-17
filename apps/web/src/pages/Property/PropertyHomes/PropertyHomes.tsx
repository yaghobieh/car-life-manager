import { useState } from 'react';
import { useTranslate } from '@forgedevstack/lingo/react';
import { EMPTY_STRING, FILTER_ALL, YAD2_OFFICIAL_URL } from '@const';
import { HomesBoard } from '@components/HomesBoard';
import { OfficialLink } from '@components/OfficialLink';
import { ClmPageHead } from '@common';
import { usePropertyState } from '@hooks';
import { HOME_FILTERS } from '../Property.const';
import { PropertyHomeForm } from '../PropertyHome/PropertyHome.form';

export function PropertyHomes() {
  const t = useTranslate();
  const { homes } = usePropertyState();
  const [dealFilter, setDealFilter] = useState(FILTER_ALL);

  return (
    <div className="Bear-PropertyHomes">
      <ClmPageHead title={t('propertyHomes')} subtitle={t('pageSubPropertyHomes')} />
      <OfficialLink href={YAD2_OFFICIAL_URL} label={t('yad2Official')} />
      <div className="Clm-tabs">
        {HOME_FILTERS.map((value) => (
          <button
            key={value}
            type="button"
            className={value === dealFilter ? 'Clm-tab Clm-tab--active' : 'Clm-tab'}
            onClick={() => setDealFilter(value)}
          >
            {t(`homeFilter_${value}`)}
          </button>
        ))}
      </div>
      <HomesBoard homes={homes} dealFilter={dealFilter} city={EMPTY_STRING} street={EMPTY_STRING} />
      <PropertyHomeForm />
    </div>
  );
}
