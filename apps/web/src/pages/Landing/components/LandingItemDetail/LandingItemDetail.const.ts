import { ZERO } from '@const';

export const VIEW_MODE_GALLERY = 'gallery';
export const VIEW_MODE_360 = '360';
export const VIEW_MODE_MAP = 'map';

export const GALLERY_MAIN_INDEX = ZERO;
export const GALLERY_THUMB_INDICES = [0, 1, 2, 3] as const;

export const ANGLE_FRONT = 0;
export const ANGLE_RIGHT = 90;
export const ANGLE_BACK = 180;
export const ANGLE_LEFT = 270;

export const PERSPECTIVE_PX = 800;
export const SCALE_FACTOR = 1.04;
export const ANGLE_QUADRANT_DEG = 90;
export const ART_INDEX_MODULO = 4;
export const FULL_CIRCLE_DEG = 360;

export const DEFAULT_SELLER_PHONE = '050-123-4567';
export const DEFAULT_SELLER_NAME = 'דני כהן';
export const DEFAULT_SELLER_AVATAR = 'מ';
export const DEFAULT_SELLER_VALID_UNTIL = '03/2027';

export const MAP_EMBED_URL =
  'https://www.openstreetmap.org/export/embed.html?bbox=34.75%2C32.05%2C34.85%2C32.12&layer=mapnik&marker=32.0853%2C34.7818';

export const INQUIRY_MSG_PREFIX = 'שלום, אני פונה לגבי המודעה שלך:';
export const INQUIRY_MSG_ROOMS = 'חדרים ב';

export const SUBTITLE_DOT_SEPARATOR = ' · ';
export const COMMA_SPACE_SEPARATOR = ', ';
export const DEAL_TYPE_SALE = 'sale';
export const DEAL_TYPE_RENT = 'rent';
export const ITEM_CAT_CAR = 'car';
export const ITEM_CAT_APT = 'apt';
export const SELLER_TYPE_AGENCY = 'agency';

export const ISRAEL_PHONE_COUNTRY_CODE = '972';
export const LEADING_ZERO = '0';
export const PHONE_SLICE_INDEX = 1;
export const NON_DIGIT_REGEX = /\D/g;
export const WHATSAPP_BASE_URL = 'https://wa.me/';
export const TELEGRAM_SHARE_BASE_URL = 'https://t.me/share/url';
