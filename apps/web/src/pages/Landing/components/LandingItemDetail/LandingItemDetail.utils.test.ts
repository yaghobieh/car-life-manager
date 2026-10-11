import { describe, it, expect } from 'vitest';
import {
  formatItemTitle,
  formatItemSub,
  cleanPhoneNumber,
  buildInquiryMessage,
  buildWhatsAppUrl,
  buildTelegramUrl,
} from './LandingItemDetail.utils';
import type { WebApartmentItem, WebCarItem } from '../../Landing.types';

describe('LandingItemDetail.utils', () => {
  const mockCar: WebCarItem = {
    id: 'c1',
    cat: 'car',
    maker: 'Toyota',
    model: 'Corolla',
    year: 2021,
    km: 45000,
    hand: 1,
    fuel: 'בנזין',
    gear: 'אוטומט',
    color: '#333333',
    price: 95000,
    city: 'תל אביב',
    desc: 'רכב מצוין',
  };

  const mockApt: WebApartmentItem = {
    id: 'a1',
    cat: 'apt',
    deal: 'sale',
    city: 'תל אביב',
    street: 'דיזנגוף 10',
    rooms: 3,
    size: 75,
    floor: 2,
    floors: 5,
    price: 3200000,
    desc: 'דירה יפה',
  };

  it('formats item title correctly for cars and apartments', () => {
    expect(formatItemTitle(mockCar, 'חדרים')).toBe('Toyota Corolla');
    expect(formatItemTitle(mockApt, 'חדרים')).toBe('3 חדרים, דיזנגוף 10');
  });

  it('formats item subtitle correctly', () => {
    expect(formatItemSub(mockCar, 'למכירה', 'להשכרה')).toBe('2021 · תל אביב');
    expect(formatItemSub(mockApt, 'למכירה', 'להשכרה')).toBe('תל אביב · למכירה');
  });

  it('cleans phone numbers and strips leading zero', () => {
    expect(cleanPhoneNumber('050-123-4567')).toBe('501234567');
    expect(cleanPhoneNumber('052 987 6543')).toBe('529876543');
    expect(cleanPhoneNumber('541112233')).toBe('541112233');
  });

  it('builds inquiry message properly', () => {
    expect(buildInquiryMessage(mockCar)).toContain('Toyota Corolla');
    expect(buildInquiryMessage(mockApt)).toContain('3 חדרים ב תל אביב');
  });

  it('builds WhatsApp and Telegram URLs', () => {
    const wa = buildWhatsAppUrl('501234567', 'בדיקה');
    expect(wa).toContain('https://wa.me/972501234567');
    expect(wa).toContain(encodeURIComponent('בדיקה'));

    const tg = buildTelegramUrl('https://example.com/item/c1', 'בדיקה');
    expect(tg).toContain('https://t.me/share/url');
    expect(tg).toContain(encodeURIComponent('https://example.com/item/c1'));
  });
});
