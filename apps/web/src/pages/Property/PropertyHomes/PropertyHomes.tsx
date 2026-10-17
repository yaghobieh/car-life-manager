import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslate } from '@forgedevstack/lingo/react';
import {
  EMPTY_STRING,
  FILTER_ALL,
  HOME_INTENT_EXISTING,
  HOME_INTENT_INTEREST,
  HOME_INTENT_QUERY,
  YAD2_OFFICIAL_URL,
} from '@const';
import { HomesBoard } from '../HomesBoard';
import { OfficialLink } from '@components/OfficialLink';
import { ClmPageHead } from '@common';
import { usePropertyState } from '@hooks';
import { HOME_FILTERS } from '../Property.const';
import { dealForHomeIntent } from '../Property.utils';
import { PropertyHomeForm } from '../PropertyHome/PropertyHome.form';

export function PropertyHomes() {
  const t = useTranslate();
  const { homes } = usePropertyState();
  const [params] = useSearchParams();
  const intent = params.get(HOME_INTENT_QUERY);
  const initialDeal = dealForHomeIntent(intent);
  const [dealFilter, setDealFilter] = useState(initialDeal ?? FILTER_ALL);

  return (
    <div className="Bear-PropertyHomes">
      <ClmPageHead title={t('propertyHomes')} subtitle={t('pageSubPropertyHomes')} />
      <OfficialLink href={YAD2_OFFICIAL_URL} label={t('yad2Official')} />
      {intent === HOME_INTENT_EXISTING ? <p className="Clm-page-sub">{t('homeIntentExistingHelp')}</p> : null}
      {intent === HOME_INTENT_INTEREST ? <p className="Clm-page-sub">{t('homeIntentInterestHelp')}</p> : null}
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
      <PropertyHomeForm initialDealType={initialDeal} />
    </div>
  );
}
