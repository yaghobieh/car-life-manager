import React from 'react';
import { useTranslate } from '@forgedevstack/lingo/react';
import { formatPrice } from '@tavo/common';
import { SvgIcon, renderArtSvg } from '../../Landing.art';
import { FEATS } from '../../Landing.const';
import type { LandingItemDetailProps } from './LandingItemDetail.types';

export function LandingItemDetail({
  item,
  aptViewMode,
  setAptViewMode,
  selectedGalleryThumb,
  setSelectedGalleryThumb,
  view360Angle,
  setView360Angle,
  autoRotate360,
  toggleAutoRotate360,
  rotate360Left,
  rotate360Right,
  phoneRevealed,
  setPhoneRevealed,
  setContactModalOpen,
  onNavigate,
}: LandingItemDetailProps) {
  const t = useTranslate();

  const isCar = item.cat === 'car';
  const isAgency = item.seller?.type === 'agency';
  const sellerTag = isAgency ? t('landing_sellerAgency') : t('landing_sellerPrivate');

  const itemTitle = isCar
    ? `${item.maker} ${item.model}`
    : `${item.rooms} ${t('landing_rooms')}, ${item.street}`;

  const itemSub = isCar
    ? `${item.year} · ${item.city}`
    : `${item.city} · ${item.deal === 'sale' ? t('landing_dealSale') : t('landing_dealRent')}`;

  const phone = item.seller?.phone || '050-123-4567';
  const cleanPhone = phone.replace(/\D/g, '');
  const cleanNoZero = cleanPhone.startsWith('0') ? cleanPhone.slice(1) : cleanPhone;
  const msgText = encodeURIComponent(
    `שלום, אני פונה לגבי המודעה שלך: ${
      item.cat === 'apt'
        ? `${item.rooms} חדרים ב${item.city}`
        : `${item.maker} ${item.model}`
    }`
  );
  const waUrl = `https://wa.me/972${cleanNoZero}?text=${msgText}`;
  const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(
    typeof window !== 'undefined' ? window.location.href : ''
  )}&text=${msgText}`;

  const normalizedAngle = Math.round(((view360Angle % 360) + 360) % 360);
  const current360ArtIndex = Math.abs(Math.floor(view360Angle / 90)) % 4;

  const renderSpecs = () => {
    if (isCar) {
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
            <b>03/2027</b>
          </div>
        </div>
      );
    }

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
  };

  const renderActiveMediaMode = () => {
    if (aptViewMode === 'gallery') {
      return (
        <div className="gallery">
          <div className="gallery__main">
            {selectedGalleryThumb === 0 && item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={itemTitle}
                className="art card__img"
              />
            ) : (
              <div
                className="art"
                dangerouslySetInnerHTML={{ __html: renderArtSvg(item, selectedGalleryThumb) }}
              />
            )}
          </div>
          <div className="thumbs">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                type="button"
                className={selectedGalleryThumb === i ? 'is-active' : ''}
                onClick={() => setSelectedGalleryThumb(i)}
                aria-label={`Image ${i + 1}`}
              >
                <div
                  className="art"
                  dangerouslySetInnerHTML={{ __html: renderArtSvg(item, i) }}
                />
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (aptViewMode === '360') {
      return (
        <div className="view-360-container">
          <div className="view-360-header">
            <span className="badge badge--brand">
              <SvgIcon name="view360" /> {t('landing_view360')} — {normalizedAngle}°
            </span>
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={toggleAutoRotate360}
            >
              ↻ {autoRotate360 ? t('landing_stopAutoRotate') : t('landing_autoRotate')}
            </button>
          </div>

          <div
            className="view-360-canvas-box"
            style={{
              transform: `perspective(800px) rotateY(${view360Angle}deg) scale(1.04)`,
              transition: autoRotate360 ? 'none' : 'transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          >
            <div
              className="view-360-art-wrap"
              dangerouslySetInnerHTML={{
                __html: renderArtSvg(item, current360ArtIndex),
              }}
            />
          </div>

          <div className="view-360-actions">
            <button type="button" className="btn btn--ghost btn--sm" onClick={rotate360Left}>
              {t('landing_rotateLeft')}
            </button>
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => setView360Angle(0)}>
              {t('landing_angleFront')}
            </button>
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => setView360Angle(90)}>
              {t('landing_angleSide')}
            </button>
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => setView360Angle(180)}>
              {t('landing_angleBack')}
            </button>
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => setView360Angle(270)}>
              {t('landing_angleSide2')}
            </button>
            <button type="button" className="btn btn--ghost btn--sm" onClick={rotate360Right}>
              {t('landing_rotateRight')}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="apartment-map-card">
        <iframe
          className="apartment-map-frame"
          title={`Map of ${item.city}`}
          src="https://www.openstreetmap.org/export/embed.html?bbox=34.75%2C32.05%2C34.85%2C32.12&layer=mapnik&marker=32.0853%2C34.7818"
        />
        <div className="apartment-map-footer">
          <div>
            <b>{'street' in item ? `${item.street}, ` : ''}{item.city}</b>
            <div className="muted">{t('landing_tagVerified')}</div>
          </div>
          <div className="row">
            <a
              href={`https://waze.com/ul?q=${encodeURIComponent(`${'street' in item ? item.street + ' ' : ''}${item.city}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary btn--sm"
            >
              {t('landing_wazeNav')}
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${'street' in item ? item.street + ' ' : ''}${item.city}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary btn--sm"
            >
              {t('landing_googleMaps')}
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container page-container-padded">
      <div className="page-head">
        <nav className="crumbs" aria-label={t('landing_crumbHome')}>
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
          >
            {t('landing_crumbHome')}
          </a>
          <SvgIcon name="chev" />
          <a
            href={isCar ? '#/cars' : '#/apartments'}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(isCar ? '/cars' : '/apartments');
            }}
          >
            {isCar ? t('landing_cars') : t('landing_apartments')}
          </a>
          <SvgIcon name="chev" />
          <span>{itemTitle}</span>
        </nav>
      </div>

      <div className="detail">
        <div>
          <div className="seg field-spacing-bottom" role="tablist">
            <button
              type="button"
              className={aptViewMode === 'gallery' ? 'is-active' : ''}
              onClick={() => setAptViewMode('gallery')}
            >
              <SvgIcon name="sun" /> {t('landing_imagesLabel')}
            </button>
            <button
              type="button"
              className={aptViewMode === '360' ? 'is-active' : ''}
              onClick={() => setAptViewMode('360')}
            >
              <SvgIcon name="view360" /> {t('landing_view360')}
            </button>
            {!isCar && (
              <button
                type="button"
                className={aptViewMode === 'map' ? 'is-active' : ''}
                onClick={() => setAptViewMode('map')}
              >
                <SvgIcon name="pin" /> {t('landing_wazeNav')}
              </button>
            )}
          </div>

          {renderActiveMediaMode()}

          <div className="panel detail-panel-spaced">
            <div className="row">
              <div>
                <h2>{itemTitle}</h2>
                <p className="muted">{itemSub}</p>
              </div>
              <div className="price">
                {formatPrice(item.price)}
                {!isCar && item.deal === 'rent' ? <small> {t('landing_perMonth')}</small> : null}
              </div>
            </div>

            {renderSpecs()}
          </div>

          <div className="panel detail-panel-spaced">
            <h2>{t('landing_description')}</h2>
            <p className="generals-card__body">{item.desc}</p>
            {!isCar && item.feats && item.feats.length > 0 && (
              <div className="feat">
                {item.feats.map((f: string) => (
                  <span key={f} className="badge badge--soft">
                    <SvgIcon name={FEATS[f]?.[1] || 'check'} />
                    {FEATS[f]?.[0] ? t(FEATS[f][0] as any) || FEATS[f][0] : f}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <aside className="side">
          <div className="panel">
            <div className="seller">
              <div className="avatar">
                {item.seller?.name ? item.seller.name.charAt(0) : 'מ'}
              </div>
              <div>
                <b>{item.seller?.name || 'דני כהן'}</b>
                <div className="muted">
                  {sellerTag} · {t('landing_memberSince')}
                </div>
              </div>
            </div>

            <div className="detail-seller-actions">
              <a
                href={`tel:${phone}`}
                className="btn btn--lg btn--block"
                onClick={() => setPhoneRevealed(true)}
              >
                <SvgIcon name="phone" />
                {phoneRevealed ? <span dir="ltr">{phone}</span> : t('landing_showPhone')}
              </a>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary btn--lg btn--block"
              >
                <SvgIcon name="whatsapp" /> {t('landing_whatsapp')}
              </a>

              <a
                href={tgUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary btn--lg btn--block"
              >
                <SvgIcon name="telegram" /> {t('landing_telegram')}
              </a>

              <button
                type="button"
                className="btn btn--ghost btn--lg btn--block"
                onClick={() => setContactModalOpen(true)}
              >
                <SvgIcon name="chat" /> {t('landing_sendMessage')}
              </button>
            </div>
          </div>

          <div className="alert alert--info">
            <SvgIcon name="shield" />
            <div>
              <b>{t('landing_safetyTip')}</b>
              {t('landing_safetyTipDesc')}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
