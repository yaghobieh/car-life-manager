import { Badge } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { SVG_EMPTY_PROPERTY, TAX_AUTHORITY_NADLAN_URL, ZERO } from '@const';
import { OfficialLink } from '@components/OfficialLink';
import { ClmEmpty, ClmSectionTitle } from '@common';
import type { AreaPriceListProps } from './AreaPriceList.types';

export function AreaPriceList(props: AreaPriceListProps) {
  const { prices, error, busy = false } = props;
  const t = useTranslate();

  return (
    <section className="Bear-AreaPriceList">
      <ClmSectionTitle title={t('areaPricesTitle')} />
      <p className="Clm-page-sub">{t('areaPricesHint')}</p>
      {error ? <p className="Clm-page-sub" role="alert">{error}</p> : null}
      {busy && prices.length === ZERO ? <p className="Clm-page-sub">{t('checking')}</p> : null}
      {prices.length === ZERO && !busy ? (
        <ClmEmpty iconSrc={SVG_EMPTY_PROPERTY} title={t('areaPricesEmpty')} body={t('areaPricesEmptyBody')} />
      ) : (
        <div className="Clm-area-prices">
          {prices.map((price) => (
            <article key={price.id} className="Clm-area-price">
              <div className="Clm-area-price-city">{price.city}</div>
              {price.neighborhood ? <div className="Clm-area-price-sub">{price.neighborhood}</div> : null}
              {price.projectName ? <div className="Clm-area-price-sub">{price.projectName}</div> : null}
              <div className="Clm-area-price-meter">
                {price.pricePerMeter ?? t('unknown')}
                <span className="Clm-listing-price-hint">{t('areaPricePerMeter')}</span>
              </div>
              <Badge variant="success" pill>{t('officialAddress')}</Badge>
            </article>
          ))}
        </div>
      )}
      <OfficialLink href={TAX_AUTHORITY_NADLAN_URL} label={t('taxAuthorityOfficial')} />
    </section>
  );
}
