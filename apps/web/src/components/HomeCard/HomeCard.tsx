import { useState } from 'react';
import { Badge, Button } from '@forgedevstack/bear';
import { useLingoFormat, useTranslate } from '@forgedevstack/lingo/react';
import {
  CURRENCY_ILS,
  DEAL_RENT,
  HOME_VIEW_3D,
  HOME_VIEW_GALLERY,
  ONE,
  WINDOW_BLANK,
  WINDOW_NOREFERRER,
  ZERO,
} from '@const';
import { featureLabelKey, homeAddress, homeMeta, listedByFromFeatures } from './HomeCard.utils';
import { HomeCardMedia } from './HomeCardMedia';
import type { HomeCardProps } from './HomeCard.types';

export function HomeCard(props: HomeCardProps) {
  const { home, onOpen } = props;
  const t = useTranslate();
  const { formatCurrency } = useLingoFormat();
  const [view, setView] = useState(HOME_VIEW_GALLERY);
  const [imageIndex, setImageIndex] = useState(ZERO);
  const lastIndex = Math.max(home.imageUrls.length - ONE, ZERO);
  const price = home.price === null ? t('noPrice') : formatCurrency(home.price, CURRENCY_ILS);
  const rentHint = home.dealType === DEAL_RENT ? t('perMonth') : null;
  const nextView = view === HOME_VIEW_3D ? HOME_VIEW_GALLERY : HOME_VIEW_3D;
  const viewLabel = view === HOME_VIEW_3D ? t('viewPhoto') : t('view3d');
  const listedKey = `listed_${listedByFromFeatures(home.features)}`;

  return (
    <article className="Clm-listing Bear-HomeCard">
      <HomeCardMedia
        home={home}
        view={view}
        imageIndex={imageIndex}
        onPrev={() => setImageIndex(imageIndex <= ZERO ? lastIndex : imageIndex - ONE)}
        onNext={() => setImageIndex(imageIndex >= lastIndex ? ZERO : imageIndex + ONE)}
      />
      <button type="button" className="Clm-listing-open" onClick={() => onOpen?.(home)}>
        <div className="Clm-listing-body">
          <div className="Clm-listing-price">
            {price}
            {rentHint ? <span className="Clm-listing-price-hint">{rentHint}</span> : null}
          </div>
          <div className="Clm-listing-addr">{homeAddress(home)}</div>
          <div className="Clm-listing-meta">
            {homeMeta(home, t('roomsUnit'), t('sqmUnit'), t('floorUnit'))}
          </div>
          {home.features.length ? (
            <div className="Clm-listing-feats">
              {home.features.map((feature) => {
                const key = featureLabelKey(feature);
                return <Badge key={feature} pill>{key ? t(key) : feature}</Badge>;
              })}
            </div>
          ) : null}
        </div>
      </button>
      <div className="Clm-listing-foot">
        <Badge variant="neutral" pill>{t(`deal_${home.dealType}`)}</Badge>
        <Badge variant="neutral" pill>{t(listedKey)}</Badge>
        {onOpen ? (
          <Button variant="ghost" onClick={() => onOpen(home)}>
            {t('viewHome')}
          </Button>
        ) : null}
        {home.model3dUrl ? (
          <Button variant="ghost" onClick={() => setView(nextView)}>
            {viewLabel}
          </Button>
        ) : null}
        {home.model3dUrl ? (
          <a href={home.model3dUrl} target={WINDOW_BLANK} rel={WINDOW_NOREFERRER} className="Bear-OfficialLink">
            {t('open3d')}
          </a>
        ) : null}
      </div>
    </article>
  );
}
