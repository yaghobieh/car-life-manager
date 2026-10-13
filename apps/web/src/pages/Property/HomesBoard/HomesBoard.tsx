import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslate } from '@forgedevstack/lingo/react';
import type { Home } from '@clm/shared';
import { FILTER_ALL, SVG_EMPTY_PROPERTY, ZERO } from '@const';
import { HomeCarousel } from '@components/HomeCarousel';
import { ClmEmpty, ClmSectionTitle } from '@common';
import { usePropertyState } from '@hooks';
import { LISTED_FILTERS, PRICE_FILTERS } from '@pages/Property/Property.const';
import { filterHomesBoard, homeDetailPath } from '@pages/Property/Property.utils';
import type { HomesBoardProps } from './HomesBoard.types';

export function HomesBoard(props: HomesBoardProps) {
  const { homes, dealFilter, city, street } = props;
  const t = useTranslate();
  const navigate = useNavigate();
  const { searchAreaPrices } = usePropertyState();
  const [listedFilter, setListedFilter] = useState(FILTER_ALL);
  const [priceFilter, setPriceFilter] = useState(FILTER_ALL);
  const visible = filterHomesBoard(homes, {
    deal: dealFilter,
    listedBy: listedFilter,
    price: priceFilter,
    city,
    street,
  });

  function openHome(home: Home) {
    void searchAreaPrices(home.city);
    navigate(homeDetailPath(home.id));
  }

  return (
    <section className="Bear-HomesBoard">
      <ClmSectionTitle title={t('homesCarousel')} />
      <div className="Clm-tabs">
        {LISTED_FILTERS.map((value) => (
          <button
            key={value}
            type="button"
            className={value === listedFilter ? 'Clm-tab Clm-tab--active' : 'Clm-tab'}
            onClick={() => setListedFilter(value)}
          >
            {t(`listedFilter_${value}`)}
          </button>
        ))}
        {PRICE_FILTERS.map((value) => (
          <button
            key={value}
            type="button"
            className={value === priceFilter ? 'Clm-tab Clm-tab--active' : 'Clm-tab'}
            onClick={() => setPriceFilter(value)}
          >
            {t(`priceFilter_${value}`)}
          </button>
        ))}
      </div>
      {visible.length === ZERO ? (
        <ClmEmpty
          iconSrc={SVG_EMPTY_PROPERTY}
          title={t('homesEmptyTitle')}
          body={t('homesEmptyBody')}
        />
      ) : (
        <HomeCarousel homes={visible} onOpen={openHome} />
      )}
    </section>
  );
}
