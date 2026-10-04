import { useTranslate } from '@forgedevstack/lingo/react';
import { Button, Typography } from '@forgedevstack/bear';
import { formatPrice } from '@tavo/common';
import { SvgIcon } from '@pages/Landing/Landing.art';
import { FEATS } from '@pages/Landing/Landing.const';
import {
  DEFAULT_SELLER_PHONE,
  DEFAULT_SELLER_NAME,
  DEFAULT_SELLER_AVATAR,
  VIEW_MODE_GALLERY,
  VIEW_MODE_360,
  VIEW_MODE_MAP,
} from './LandingItemDetail.const';
import type { LandingItemDetailProps } from './LandingItemDetail.types';
import { LandingItemDetail360Viewer } from './components/LandingItemDetail360Viewer';
import { LandingItemDetailGallery } from './components/LandingItemDetailGallery';
import { LandingItemDetailSpecs } from './components/LandingItemDetailSpecs';
import { LandingItemDetailMap } from './components/LandingItemDetailMap';

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

  const phone = item.seller?.phone || DEFAULT_SELLER_PHONE;
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

  const renderActiveMediaMode = () => {
    switch (aptViewMode) {
      case VIEW_MODE_360:
        return (
          <LandingItemDetail360Viewer
            item={item}
            view360Angle={view360Angle}
            setView360Angle={setView360Angle}
            autoRotate360={autoRotate360}
            toggleAutoRotate360={toggleAutoRotate360}
            rotate360Left={rotate360Left}
            rotate360Right={rotate360Right}
          />
        );
      case VIEW_MODE_MAP:
        return <LandingItemDetailMap item={item} />;
      case VIEW_MODE_GALLERY:
      default:
        return (
          <LandingItemDetailGallery
            item={item}
            selectedGalleryThumb={selectedGalleryThumb}
            setSelectedGalleryThumb={setSelectedGalleryThumb}
            itemTitle={itemTitle}
          />
        );
    }
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
            <Button
              variant="ghost"
              className={aptViewMode === VIEW_MODE_GALLERY ? 'is-active' : ''}
              onClick={() => setAptViewMode(VIEW_MODE_GALLERY)}
            >
              <SvgIcon name="sun" /> {t('landing_imagesLabel')}
            </Button>
            <Button
              variant="ghost"
              className={aptViewMode === VIEW_MODE_360 ? 'is-active' : ''}
              onClick={() => setAptViewMode(VIEW_MODE_360)}
            >
              <SvgIcon name="view360" /> {t('landing_view360')}
            </Button>
            {!isCar && (
              <Button
                variant="ghost"
                className={aptViewMode === VIEW_MODE_MAP ? 'is-active' : ''}
                onClick={() => setAptViewMode(VIEW_MODE_MAP)}
              >
                <SvgIcon name="pin" /> {t('landing_wazeNav')}
              </Button>
            )}
          </div>

          {renderActiveMediaMode()}

          <div className="panel detail-panel-spaced">
            <div className="row">
              <div>
                <Typography variant="h2">
                  {itemTitle}
                </Typography>
                <Typography variant="body" color="muted">
                  {itemSub}
                </Typography>
              </div>
              <div className="price">
                {formatPrice(item.price)}
                {!isCar && item.deal === 'rent' ? <small> {t('landing_perMonth')}</small> : null}
              </div>
            </div>

            <LandingItemDetailSpecs item={item} isCar={isCar} />
          </div>

          <div className="panel detail-panel-spaced">
            <Typography variant="h2">
              {t('landing_description')}
            </Typography>
            <Typography variant="body" className="generals-card__body">
              {item.desc}
            </Typography>
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
                {item.seller?.name ? item.seller.name.charAt(0) : DEFAULT_SELLER_AVATAR}
              </div>
              <div>
                <b>{item.seller?.name || DEFAULT_SELLER_NAME}</b>
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

              <Button
                variant="ghost"
                size="lg"
                className="btn btn--ghost btn--lg btn--block"
                onClick={() => setContactModalOpen(true)}
              >
                <SvgIcon name="chat" /> {t('landing_sendMessage')}
              </Button>
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
