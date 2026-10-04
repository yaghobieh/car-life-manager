import React from 'react';
import { useTranslate } from '@forgedevstack/lingo/react';
import { formatPrice } from '@tavo/common';
import { SvgIcon, renderArtSvg } from '../../Landing.art';
import type { LandingCardProps } from './LandingCard.types';

export function LandingCard({
  item,
  isFav = false,
  onToggleFav,
  onNavigate,
  preview = false,
}: LandingCardProps) {
  const t = useTranslate();

  const isCar = item.cat === 'car';
  const isAgency = item.seller?.type === 'agency';

  const title = isCar
    ? `${item.maker} ${item.model}`
    : `${item.rooms} ${t('landing_rooms')}, ${item.street}`;

  const sub = isCar
    ? `${item.year} · ${item.city}`
    : `${item.city} · ${item.deal === 'sale' ? t('landing_dealSale') : t('landing_dealRent')}`;

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!preview && onNavigate) {
      onNavigate(`/item/${item.id}`);
    }
  };

  const handleFavClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFav) {
      onToggleFav(item.id);
    }
  };

  return (
    <article className="card">
      <div className="card__media">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={title}
            className="art card__img"
          />
        ) : (
          <div
            className="art"
            dangerouslySetInnerHTML={{ __html: renderArtSvg(item) }}
          />
        )}

        <div className="card__tags">
          <span className={`badge ${isAgency ? 'badge--brand' : 'badge--soft'}`}>
            {isAgency ? t('landing_tagAgency') : t('landing_tagPrivate')}
          </span>
          {item.isNew && (
            <span className="badge badge--accent">
              {t('landing_newOnSite')}
            </span>
          )}
        </div>

        {!preview && onToggleFav && (
          <button
            type="button"
            className={`card__fav ${isFav ? 'is-on' : ''}`}
            onClick={handleFavClick}
            aria-pressed={isFav}
            aria-label={isFav ? t('landing_removeFromFavs') : t('landing_saveToFavs')}
          >
            <SvgIcon name="heart" />
          </button>
        )}
      </div>

      <div className="card__body">
        <div className="price">
          {formatPrice(item.price)}
          {item.cat === 'apt' && item.deal === 'rent' && <small> {t('landing_perMonth')}</small>}
        </div>

        <h3 className="card__title">
          {preview ? (
            <span>{title}</span>
          ) : (
            <a href={`#/item/${item.id}`} onClick={handleCardClick}>
              {title}
            </a>
          )}
        </h3>

        <div className="card__sub">{sub}</div>

        <div className="card__meta">
          {isCar ? (
            <>
              <span>
                <SvgIcon name="gauge" />
                {Number(item.km).toLocaleString('he-IL')} {t('landing_km')}
              </span>
              <span>
                <SvgIcon name="fuel" />
                {item.fuel}
              </span>
              <span>
                {t('landing_hand')} {item.hand}
              </span>
            </>
          ) : (
            <>
              <span>
                <SvgIcon name="bed" />
                {item.rooms} {t('landing_rooms')}
              </span>
              <span>
                <SvgIcon name="size" />
                {item.size} {t('landing_sqm')}
              </span>
              <span>
                <SvgIcon name="floor" />
                {t('landing_floor')} {item.floor}
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
