import type { OfficialAddress } from '@clm/shared';
import { ADDRESS_KIND_CITY, ADDRESS_KIND_STREET, ADDRESS_SOURCE_OFFICIAL } from './addresses.const';

export const FALLBACK_ADDRESSES: OfficialAddress[] = [
  // Major cities
  { id: 'city:5000', city: 'תל אביב - יפו', street: null, cityCode: '5000', streetCode: null, kind: ADDRESS_KIND_CITY, source: ADDRESS_SOURCE_OFFICIAL, region: 'תל אביב' },
  { id: 'city:3000', city: 'ירושלים', street: null, cityCode: '3000', streetCode: null, kind: ADDRESS_KIND_CITY, source: ADDRESS_SOURCE_OFFICIAL, region: 'ירושלים' },
  { id: 'city:4000', city: 'חיפה', street: null, cityCode: '4000', streetCode: null, kind: ADDRESS_KIND_CITY, source: ADDRESS_SOURCE_OFFICIAL, region: 'חיפה' },
  { id: 'city:8300', city: 'ראשון לציון', street: null, cityCode: '8300', streetCode: null, kind: ADDRESS_KIND_CITY, source: ADDRESS_SOURCE_OFFICIAL, region: 'מרכז' },
  { id: 'city:7900', city: 'פתח תקווה', street: null, cityCode: '7900', streetCode: null, kind: ADDRESS_KIND_CITY, source: ADDRESS_SOURCE_OFFICIAL, region: 'מרכז' },
  { id: 'city:70', city: 'אשדוד', street: null, cityCode: '70', streetCode: null, kind: ADDRESS_KIND_CITY, source: ADDRESS_SOURCE_OFFICIAL, region: 'דרום' },
  { id: 'city:7400', city: 'נתניה', street: null, cityCode: '7400', streetCode: null, kind: ADDRESS_KIND_CITY, source: ADDRESS_SOURCE_OFFICIAL, region: 'מרכז' },
  { id: 'city:9000', city: 'באר שבע', street: null, cityCode: '9000', streetCode: null, kind: ADDRESS_KIND_CITY, source: ADDRESS_SOURCE_OFFICIAL, region: 'דרום' },
  { id: 'city:6600', city: 'חולון', street: null, cityCode: '6600', streetCode: null, kind: ADDRESS_KIND_CITY, source: ADDRESS_SOURCE_OFFICIAL, region: 'תל אביב' },
  { id: 'city:6100', city: 'בני ברק', street: null, cityCode: '6100', streetCode: null, kind: ADDRESS_KIND_CITY, source: ADDRESS_SOURCE_OFFICIAL, region: 'תל אביב' },
  { id: 'city:8600', city: 'רמת גן', street: null, cityCode: '8600', streetCode: null, kind: ADDRESS_KIND_CITY, source: ADDRESS_SOURCE_OFFICIAL, region: 'תל אביב' },
  { id: 'city:6400', city: 'בת ים', street: null, cityCode: '6400', streetCode: null, kind: ADDRESS_KIND_CITY, source: ADDRESS_SOURCE_OFFICIAL, region: 'תל אביב' },
  { id: 'city:64000', city: 'הרצליה', street: null, cityCode: '64000', streetCode: null, kind: ADDRESS_KIND_CITY, source: ADDRESS_SOURCE_OFFICIAL, region: 'תל אביב' },
  { id: 'city:6900', city: 'כפר סבא', street: null, cityCode: '6900', streetCode: null, kind: ADDRESS_KIND_CITY, source: ADDRESS_SOURCE_OFFICIAL, region: 'מרכז' },
  { id: 'city:8700', city: 'רעננה', street: null, cityCode: '8700', streetCode: null, kind: ADDRESS_KIND_CITY, source: ADDRESS_SOURCE_OFFICIAL, region: 'מרכז' },
  { id: 'city:1200', city: 'מודיעין-מכבים-רעות', street: null, cityCode: '1200', streetCode: null, kind: ADDRESS_KIND_CITY, source: ADDRESS_SOURCE_OFFICIAL, region: 'מרכז' },

  // Key streets
  { id: 'street:5000:0321', city: 'תל אביב - יפו', street: 'דיזנגוף', cityCode: '5000', streetCode: '0321', kind: ADDRESS_KIND_STREET, source: ADDRESS_SOURCE_OFFICIAL, region: 'תל אביב' },
  { id: 'street:5000:0890', city: 'תל אביב - יפו', street: 'שדרות רוטשילד', cityCode: '5000', streetCode: '0890', kind: ADDRESS_KIND_STREET, source: ADDRESS_SOURCE_OFFICIAL, region: 'תל אביב' },
  { id: 'street:5000:0105', city: 'תל אביב - יפו', street: 'אבן גבירול', cityCode: '5000', streetCode: '0105', kind: ADDRESS_KIND_STREET, source: ADDRESS_SOURCE_OFFICIAL, region: 'תל אביב' },
  { id: 'street:5000:0200', city: 'תל אביב - יפו', street: 'אחד העם', cityCode: '5000', streetCode: '0200', kind: ADDRESS_KIND_STREET, source: ADDRESS_SOURCE_OFFICIAL, region: 'תל אביב' },
  { id: 'street:3000:0501', city: 'ירושלים', street: 'הפלמ״ח', cityCode: '3000', streetCode: '0501', kind: ADDRESS_KIND_STREET, source: ADDRESS_SOURCE_OFFICIAL, region: 'ירושלים' },
  { id: 'street:3000:0100', city: 'ירושלים', street: 'יפו', cityCode: '3000', streetCode: '0100', kind: ADDRESS_KIND_STREET, source: ADDRESS_SOURCE_OFFICIAL, region: 'ירושלים' },
  { id: 'street:4000:0402', city: 'חיפה', street: 'הנביאים', cityCode: '4000', streetCode: '0402', kind: ADDRESS_KIND_STREET, source: ADDRESS_SOURCE_OFFICIAL, region: 'חיפה' },
  { id: 'street:4000:0701', city: 'חיפה', street: 'שדרות מוריה', cityCode: '4000', streetCode: '0701', kind: ADDRESS_KIND_STREET, source: ADDRESS_SOURCE_OFFICIAL, region: 'חיפה' },
  { id: 'street:8300:0101', city: 'ראשון לציון', street: 'הרצל', cityCode: '8300', streetCode: '0101', kind: ADDRESS_KIND_STREET, source: ADDRESS_SOURCE_OFFICIAL, region: 'מרכז' },
  { id: 'street:7400:0201', city: 'נתניה', street: 'שדרות בן גוריון', cityCode: '7400', streetCode: '0201', kind: ADDRESS_KIND_STREET, source: ADDRESS_SOURCE_OFFICIAL, region: 'מרכז' },
  { id: 'street:7900:0301', city: 'פתח תקווה', street: 'רוטשילד', cityCode: '7900', streetCode: '0301', kind: ADDRESS_KIND_STREET, source: ADDRESS_SOURCE_OFFICIAL, region: 'מרכז' },
  { id: 'street:9000:0101', city: 'באר שבע', street: 'שדרות רגר', cityCode: '9000', streetCode: '0101', kind: ADDRESS_KIND_STREET, source: ADDRESS_SOURCE_OFFICIAL, region: 'דרום' },
  { id: 'street:8600:0501', city: 'רמת גן', street: 'ז׳בוטינסקי', cityCode: '8600', streetCode: '0501', kind: ADDRESS_KIND_STREET, source: ADDRESS_SOURCE_OFFICIAL, region: 'תל אביב' },
  { id: 'street:64000:0101', city: 'הרצליה', street: 'סוקולוב', cityCode: '64000', streetCode: '0101', kind: ADDRESS_KIND_STREET, source: ADDRESS_SOURCE_OFFICIAL, region: 'תל אביב' },
];

export function searchFallbackAddresses(query: string): OfficialAddress[] {
  const q = query.trim().toLowerCase();
  return FALLBACK_ADDRESSES.filter((item) =>
    item.city.toLowerCase().includes(q) ||
    (item.street && item.street.toLowerCase().includes(q))
  );
}
