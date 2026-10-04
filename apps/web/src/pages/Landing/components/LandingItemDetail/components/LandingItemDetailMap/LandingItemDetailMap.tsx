import { useTranslate } from '@forgedevstack/lingo/react';
import { Link } from '@forgedevstack/bear';
import { MAP_EMBED_URL } from '../../LandingItemDetail.const';
import type { LandingItemDetailMapProps } from '../../LandingItemDetail.types';

export function LandingItemDetailMap({ item }: LandingItemDetailMapProps) {
  const t = useTranslate();
  const addressQuery = `${'street' in item ? item.street + ' ' : ''}${item.city}`;

  return (
    <div className="apartment-map-card">
      <iframe
        className="apartment-map-frame"
        title={`Map of ${item.city}`}
        src={MAP_EMBED_URL}
      />
      <div className="apartment-map-footer">
        <div>
          <b>{'street' in item ? `${item.street}, ` : ''}{item.city}</b>
          <div className="muted">{t('landing_tagVerified')}</div>
        </div>
        <div className="row">
          <Link
            href={`https://waze.com/ul?q=${encodeURIComponent(addressQuery)}`}
            external
            className="btn btn--secondary btn--sm"
          >
            {t('landing_wazeNav')}
          </Link>
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressQuery)}`}
            external
            className="btn btn--secondary btn--sm"
          >
            {t('landing_googleMaps')}
          </Link>
        </div>
      </div>
    </div>
  );
}
