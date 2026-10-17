import { useParams } from 'react-router-dom';
import { Badge } from '@forgedevstack/bear';
import { useLingoFormat, useTranslate } from '@forgedevstack/lingo/react';
import type { Home } from '@clm/shared';
import {
  CURRENCY_ILS,
  DEAL_RENT,
  EMPTY_STRING,
  FEATURE_AIRCON,
  FEATURE_ELEVATOR,
  HOME_VIEW_GALLERY,
  SVG_EMPTY_PROPERTY,
  YAD2_OFFICIAL_URL,
  ZERO,
} from '@const';
import { AreaPriceList } from '@components/AreaPriceList';
import { HomeCardMedia } from '@components/HomeCard/HomeCardMedia';
import { OfficialLink } from '@components/OfficialLink';
import { ClmEmpty, ClmPageHead } from '@common';
import { usePropertyState } from '@hooks';
import { featureLabelKey, homeAddress, homeHasFeature, listedByFromFeatures } from '../Property.utils';

function extraHomeFeatures(home: Home): string[] {
  return home.features.filter((feature) => {
    const key = featureLabelKey(feature);
    return key !== 'feature_elevator' && key !== 'feature_aircon' && key !== 'feature_broker';
  });
}

function HomeMissing() {
  const t = useTranslate();
  return (
    <div className="Bear-PropertyHomeDetail">
      <ClmPageHead title={t('homeDetails')} subtitle={t('pageSubPropertyHomes')} />
      <ClmEmpty
        iconSrc={SVG_EMPTY_PROPERTY}
        title={t('homesEmptyTitle')}
        body={t('homesEmptyBody')}
      />
    </div>
  );
}

export function PropertyHomeDetail() {
  const t = useTranslate();
  const { formatCurrency } = useLingoFormat();
  const { homeId } = useParams();
  const { homes, areaPrices, areaSearching, areaSearchError } = usePropertyState();
  const home = homes.find((item) => item.id === homeId);
  if (!home) return <HomeMissing />;

  const listedKey = `listed_${listedByFromFeatures(home.features)}`;
  const price = home.price === null ? t('noPrice') : formatCurrency(home.price, CURRENCY_ILS);
  const extras = extraHomeFeatures(home);
  const specs = [
    home.rooms ? `${home.rooms} ${t('roomsUnit')}` : EMPTY_STRING,
    home.sqm ? `${home.sqm} ${t('sqmUnit')}` : EMPTY_STRING,
    home.floor === null ? EMPTY_STRING : `${t('floorUnit')} ${home.floor}`,
  ].filter(Boolean).join(' · ');

  return (
    <div className="Bear-PropertyHomeDetail">
      <ClmPageHead title={homeAddress(home)} subtitle={t('homeDetails')} />
      <article className="Clm-listing">
        <HomeCardMedia
          home={home}
          view={HOME_VIEW_GALLERY}
          imageIndex={ZERO}
          onPrev={() => undefined}
          onNext={() => undefined}
        />
        <div className="Clm-listing-body">
          <div className="Clm-listing-price">
            {price}
            {home.dealType === DEAL_RENT ? <span className="Clm-listing-price-hint">{t('perMonth')}</span> : null}
          </div>
          <div className="Clm-listing-meta">{specs}</div>
          <div className="Clm-listing-feats">
            <Badge variant="neutral" pill>{t(`deal_${home.dealType}`)}</Badge>
            <Badge variant="neutral" pill>{t(listedKey)}</Badge>
            <Badge pill>{homeHasFeature(home, FEATURE_ELEVATOR) ? t('feature_elevator') : t('homeNoElevator')}</Badge>
            <Badge pill>{homeHasFeature(home, FEATURE_AIRCON) ? t('feature_aircon') : t('homeNoAircon')}</Badge>
            {extras.map((feature) => (
              <Badge key={feature} pill>{feature}</Badge>
            ))}
          </div>
          {home.notes ? <p className="Clm-page-sub">{home.notes}</p> : null}
          {home.model3dUrl ? <OfficialLink href={home.model3dUrl} label={t('open3d')} /> : null}
        </div>
      </article>
      <AreaPriceList prices={areaPrices} error={areaSearchError} busy={areaSearching} />
      <OfficialLink href={YAD2_OFFICIAL_URL} label={t('yad2Official')} />
    </div>
  );
}
