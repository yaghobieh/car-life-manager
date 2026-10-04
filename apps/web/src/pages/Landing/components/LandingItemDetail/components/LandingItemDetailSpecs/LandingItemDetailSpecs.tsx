import React from 'react';
import { useTranslate } from '@forgedevstack/lingo/react';
import { DEFAULT_SELLER_VALID_UNTIL } from '../../LandingItemDetail.const';
import type { LandingItemDetailSpecsProps } from '../../LandingItemDetail.types';

export function LandingItemDetailSpecs({ item, isCar }: LandingItemDetailSpecsProps) {
  const t = useTranslate();

  if (isCar && 'year' in item) {
    return (
      <div className="specs">
        <div className="spec">
          <small>{t('landing_yearLabel')}</small>
          <b>{item.year}</b>
        </div>
        <div className="spec">
          <small>{t('landing_kmLabel')}</small>
          <b>{Number(item.km).toLocaleString('he-IL')} {t('landing_km')}</b>
        </div>
        <div className="spec">
          <small>{t('landing_hand')}</small>
          <b>{item.hand}</b>
        </div>
        <div className="spec">
          <small>{t('landing_fuel')}</small>
          <b>{item.fuel}</b>
        </div>
        <div className="spec">
          <small>{t('landing_gear')}</small>
          <b>{item.gear}</b>
        </div>
        <div className="spec">
          <small>{t('validUntil')}</small>
          <b>{DEFAULT_SELLER_VALID_UNTIL}</b>
        </div>
      </div>
    );
  }

  if ('rooms' in item) {
    return (
      <div className="specs">
        <div className="spec">
          <small>{t('landing_rooms')}</small>
          <b>{item.rooms}</b>
        </div>
        <div className="spec">
          <small>{t('landing_areaLabel')}</small>
          <b>{item.size} {t('landing_sqm')}</b>
        </div>
        <div className="spec">
          <small>{t('landing_floor')}</small>
          <b>{item.floor} / {item.floors}</b>
        </div>
        <div className="spec">
          <small>{t('landing_dealType')}</small>
          <b>{item.deal === 'sale' ? t('landing_dealSale') : t('landing_dealRent')}</b>
        </div>
        <div className="spec">
          <small>{t('landing_city')}</small>
          <b>{item.city}</b>
        </div>
        <div className="spec">
          <small>{t('completed')}</small>
          <b>{t('landing_tagVerified')}</b>
        </div>
      </div>
    );
  }

  return null;
}
