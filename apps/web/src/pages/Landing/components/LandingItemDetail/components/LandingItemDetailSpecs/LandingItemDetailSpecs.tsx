import { useTranslate } from '@forgedevstack/lingo/react';
import { Typography } from '@forgedevstack/bear';
import { DEFAULT_SELLER_VALID_UNTIL } from '../../LandingItemDetail.const';
import type { LandingItemDetailSpecsProps } from '../../LandingItemDetail.types';

export function LandingItemDetailSpecs({ item, isCar }: LandingItemDetailSpecsProps) {
  const t = useTranslate();

  if (isCar && 'year' in item) {
    return (
      <div className="specs">
        <div className="spec">
          <Typography variant="caption" color="muted">
            {t('landing_yearLabel')}
          </Typography>
          <Typography variant="body" weight="bold">
            {item.year}
          </Typography>
        </div>
        <div className="spec">
          <Typography variant="caption" color="muted">
            {t('landing_kmLabel')}
          </Typography>
          <Typography variant="body" weight="bold">
            {Number(item.km).toLocaleString('he-IL')} {t('landing_km')}
          </Typography>
        </div>
        <div className="spec">
          <Typography variant="caption" color="muted">
            {t('landing_hand')}
          </Typography>
          <Typography variant="body" weight="bold">
            {item.hand}
          </Typography>
        </div>
        <div className="spec">
          <Typography variant="caption" color="muted">
            {t('landing_fuel')}
          </Typography>
          <Typography variant="body" weight="bold">
            {item.fuel}
          </Typography>
        </div>
        <div className="spec">
          <Typography variant="caption" color="muted">
            {t('landing_gear')}
          </Typography>
          <Typography variant="body" weight="bold">
            {item.gear}
          </Typography>
        </div>
        <div className="spec">
          <Typography variant="caption" color="muted">
            {t('validUntil')}
          </Typography>
          <Typography variant="body" weight="bold">
            {DEFAULT_SELLER_VALID_UNTIL}
          </Typography>
        </div>
      </div>
    );
  }

  if ('rooms' in item) {
    return (
      <div className="specs">
        <div className="spec">
          <Typography variant="caption" color="muted">
            {t('landing_rooms')}
          </Typography>
          <Typography variant="body" weight="bold">
            {item.rooms}
          </Typography>
        </div>
        <div className="spec">
          <Typography variant="caption" color="muted">
            {t('landing_areaLabel')}
          </Typography>
          <Typography variant="body" weight="bold">
            {item.size} {t('landing_sqm')}
          </Typography>
        </div>
        <div className="spec">
          <Typography variant="caption" color="muted">
            {t('landing_floor')}
          </Typography>
          <Typography variant="body" weight="bold">
            {item.floor} / {item.floors}
          </Typography>
        </div>
        <div className="spec">
          <Typography variant="caption" color="muted">
            {t('landing_dealType')}
          </Typography>
          <Typography variant="body" weight="bold">
            {item.deal === 'sale' ? t('landing_dealSale') : t('landing_dealRent')}
          </Typography>
        </div>
        <div className="spec">
          <Typography variant="caption" color="muted">
            {t('landing_city')}
          </Typography>
          <Typography variant="body" weight="bold">
            {item.city}
          </Typography>
        </div>
        <div className="spec">
          <Typography variant="caption" color="muted">
            {t('completed')}
          </Typography>
          <Typography variant="body" weight="bold">
            {t('landing_tagVerified')}
          </Typography>
        </div>
      </div>
    );
  }

  return null;
}
