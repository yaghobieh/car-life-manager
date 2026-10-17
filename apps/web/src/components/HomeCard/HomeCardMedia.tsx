import { Button } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { HOME_VIEW_3D, ONE, ZERO } from '@const';
import type { HomeCardMediaProps } from './HomeCard.types';

export function HomeCardMedia(props: HomeCardMediaProps) {
  const { home, view, imageIndex, onPrev, onNext } = props;
  const t = useTranslate();
  const image = home.imageUrls[imageIndex];
  const show3d = view === HOME_VIEW_3D && Boolean(home.model3dUrl);
  const manyImages = home.imageUrls.length > ONE;

  if (show3d && home.model3dUrl) {
    return (
      <div className="Clm-listing-media">
        <span className="Clm-listing-tag">{t(`deal_${home.dealType}`)}</span>
        <iframe className="Clm-listing-3d" title={t('view3d')} src={home.model3dUrl} />
      </div>
    );
  }

  if (image) {
    return (
      <div className="Clm-listing-media">
        <span className="Clm-listing-tag">{t(`deal_${home.dealType}`)}</span>
        <img className="Clm-listing-photo" src={image} alt={home.city} />
        {manyImages ? (
          <div className="Clm-listing-gallery-nav">
            <Button variant="ghost" onClick={onPrev}>{t('back')}</Button>
            <span>{imageIndex + ONE}/{home.imageUrls.length}</span>
            <Button variant="ghost" onClick={onNext}>{t('continue')}</Button>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="Clm-listing-media">
      <span className="Clm-listing-tag">{t(`deal_${home.dealType}`)}</span>
      <p className="Clm-listing-placeholder">{t('homeImagePending')}</p>
    </div>
  );
}
