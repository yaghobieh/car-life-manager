import type { WebListingItem } from '../../Landing.types';
import {
  COMMA_SPACE_SEPARATOR,
  DEAL_TYPE_SALE,
  INQUIRY_MSG_PREFIX,
  INQUIRY_MSG_ROOMS,
  ISRAEL_PHONE_COUNTRY_CODE,
  ITEM_CAT_APT,
  ITEM_CAT_CAR,
  LEADING_ZERO,
  NON_DIGIT_REGEX,
  PHONE_SLICE_INDEX,
  SUBTITLE_DOT_SEPARATOR,
  TELEGRAM_SHARE_BASE_URL,
  WHATSAPP_BASE_URL,
} from './LandingItemDetail.const';

export function formatItemTitle(item: WebListingItem, roomsLabel: string): string {
  if (item.cat === ITEM_CAT_CAR) {
    return `${item.maker} ${item.model}`;
  }
  return `${item.rooms} ${roomsLabel}${COMMA_SPACE_SEPARATOR}${item.street}`;
}

export function formatItemSub(item: WebListingItem, saleText: string, rentText: string): string {
  if (item.cat === ITEM_CAT_CAR) {
    return `${item.year}${SUBTITLE_DOT_SEPARATOR}${item.city}`;
  }
  const dealText = item.deal === DEAL_TYPE_SALE ? saleText : rentText;
  return `${item.city}${SUBTITLE_DOT_SEPARATOR}${dealText}`;
}

export function cleanPhoneNumber(phone: string): string {
  const digitsOnly = phone.replace(NON_DIGIT_REGEX, '');
  if (digitsOnly.startsWith(LEADING_ZERO)) {
    return digitsOnly.slice(PHONE_SLICE_INDEX);
  }
  return digitsOnly;
}

export function buildInquiryMessage(item: WebListingItem): string {
  const msgDetails =
    item.cat === ITEM_CAT_APT
      ? `${item.rooms} ${INQUIRY_MSG_ROOMS} ${item.city}`
      : `${item.maker} ${item.model}`;
  return `${INQUIRY_MSG_PREFIX} ${msgDetails}`;
}

export function buildWhatsAppUrl(cleanPhone: string, message: string): string {
  const msgText = encodeURIComponent(message);
  return `${WHATSAPP_BASE_URL}${ISRAEL_PHONE_COUNTRY_CODE}${cleanPhone}?text=${msgText}`;
}

export function buildTelegramUrl(currentUrl: string, message: string): string {
  const msgText = encodeURIComponent(message);
  const encodedUrl = encodeURIComponent(currentUrl);
  return `${TELEGRAM_SHARE_BASE_URL}?url=${encodedUrl}&text=${msgText}`;
}
