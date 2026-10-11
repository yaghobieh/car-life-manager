import React from 'react';
import { useTranslate } from '@forgedevstack/lingo/react';
import { Box, Typography, Badge, Button, Link } from '@forgedevstack/bear';
import { BearIcons } from '@forgedevstack/bear-icons';
import { formatPrice } from '@tavo/common';
import { SvgIcon, renderArtSvg } from '../../Landing.art';
import {
  DEAL_TYPE_RENT,
  DEAL_TYPE_SALE,
  ITEM_CATEGORY_CAR,
  LOCALE_HE_IL,
  SELLER_TYPE_AGENCY,
} from './LandingCard.const';
import type { LandingCardProps } from './LandingCard.types';

const HeartIcon = BearIcons.HeartIcon;

export function LandingCard(props: LandingCardProps) {
  const {
    item,
    isFav = false,
    onToggleFav,
    onNavigate,
    preview = false,
  } = props;

  const t = useTranslate();

  const isCar = item.cat === ITEM_CATEGORY_CAR;
  const isAgency = item.seller?.type === SELLER_TYPE_AGENCY;

  const title = isCar
    ? `${item.maker} ${item.model}`
    : `${item.rooms} ${t('landing_rooms')}, ${item.street}`;

  const sub = isCar
    ? `${item.year} · ${item.city}`
    : `${item.city} · ${item.deal === DEAL_TYPE_SALE ? t('landing_dealSale') : t('landing_dealRent')}`;

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

  const renderCardMeta = () => {
    if (isCar) {
      return (
        <>
          <Box as="span">
            <SvgIcon name="gauge" />
            {Number(item.km).toLocaleString(LOCALE_HE_IL)} {t('landing_km')}
          </Box>
          <Box as="span">
            <SvgIcon name="fuel" />
            {item.fuel}
          </Box>
          <Box as="span">
            {t('landing_hand')} {item.hand}
          </Box>
        </>
      );
    }

    return (
      <>
        <Box as="span">
          <SvgIcon name="bed" />
          {item.rooms} {t('landing_rooms')}
        </Box>
        <Box as="span">
          <SvgIcon name="size" />
          {item.size} {t('landing_sqm')}
        </Box>
        <Box as="span">
          <SvgIcon name="floor" />
          {t('landing_floor')} {item.floor}
        </Box>
      </>
    );
  };

  return (
    <Box as="article" className="card">
      <Box
        className="card__media"
        onClick={handleCardClick}
        role={preview ? undefined : 'button'}
        tabIndex={preview ? undefined : 0}
      >
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={title}
            className="art card__img"
          />
        ) : (
          <Box
            className="art"
            dangerouslySetInnerHTML={{ __html: renderArtSvg(item) }}
          />
        )}

        <Box className="card__tags">
          <Badge
            variant={isAgency ? 'primary' : 'neutral'}
            className={isAgency ? 'badge--brand' : 'badge--soft'}
          >
            {isAgency ? t('landing_tagAgency') : t('landing_tagPrivate')}
          </Badge>
          {item.isNew && (
            <Badge variant="warning" className="badge--accent">
              {t('landing_newOnSite')}
            </Badge>
          )}
        </Box>

        {!preview && onToggleFav && (
          <Button
            type="button"
            variant="ghost"
            className={`card__fav ${isFav ? 'is-on' : ''}`}
            onClick={handleFavClick}
            aria-pressed={isFav}
            aria-label={isFav ? t('landing_removeFromFavs') : t('landing_saveToFavs')}
          >
            <HeartIcon width={18} height={18} />
          </Button>
        )}
      </Box>

      <Box className="card__body">
        <Box className="price">
          {formatPrice(item.price)}
          {!isCar && item.deal === DEAL_TYPE_RENT && (
            <Typography variant="caption">{t('landing_perMonth')}</Typography>
          )}
        </Box>

        <Typography variant="h3" className="card__title">
          {preview ? (
            <Box as="span">{title}</Box>
          ) : (
            <Link href={`#/item/${item.id}`} onClick={handleCardClick}>
              {title}
            </Link>
          )}
        </Typography>

        <Typography variant="body2" className="card__sub">
          {sub}
        </Typography>

        <Box className="card__meta">
          {renderCardMeta()}
        </Box>
      </Box>
    </Box>
  );
}
