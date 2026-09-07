import { describe, expect, it } from 'vitest';
import type { Home } from '@clm/shared';
import {
  addressSubtitle,
  addressTitle,
  featureLabelKey,
  filterHomes,
  filterHomesBoard,
  homeAddress,
  homeDetailPath,
  homeMeta,
  isOverdue,
  lawyerInitials,
  listedByFromFeatures,
  mergeHomeFeatures,
  parseCsvList,
} from './Property.utils';
import { FEATURE_AIRCON, FEATURE_BROKER, FEATURE_ELEVATOR, FILTER_ALL, LISTED_BROKER, LISTED_PRIVATE, PRICE_WITH, ROUTE_PROPERTY_HOMES } from '@const';

const home = {
  id: 'h1',
  userId: 'u1',
  dealType: 'sale',
  city: 'תל אביב-יפו',
  street: 'דיזנגוף',
  houseNumber: '50',
  neighborhood: null,
  rooms: 3,
  sqm: 78,
  floor: 4,
  price: 2800000,
  currency: 'ILS',
  features: ['מרפסת'],
  imageUrls: [],
  model3dUrl: null,
  nextDueDate: '2026-09-01',
  nextDueTitle: 'ארנונה',
  notes: null,
  source: 'user',
  createdAt: '2026-09-07T00:00:00.000Z',
} as Home;

describe('addressTitle', () => {
  it('prefers the official street name', () => {
    expect(addressTitle({
      id: 'street-1',
      kind: 'street',
      city: 'תל אביב-יפו',
      street: 'דיזנגוף',
      cityCode: '5000',
      streetCode: '123',
      region: 'תל אביב',
      source: 'official',
    })).toBe('דיזנגוף');
  });
});

describe('addressSubtitle', () => {
  it('joins city and region', () => {
    expect(addressSubtitle({
      id: 'street-1',
      kind: 'street',
      city: 'תל אביב-יפו',
      street: 'דיזנגוף',
      cityCode: '5000',
      streetCode: '123',
      region: 'תל אביב',
      source: 'official',
    }, 'עיר')).toBe('תל אביב-יפו • תל אביב');
  });
});

describe('homeAddress', () => {
  it('joins street number and city', () => {
    expect(homeAddress(home)).toBe('דיזנגוף 50 • תל אביב-יפו');
  });
});

describe('homeMeta', () => {
  it('formats rooms sqm and floor', () => {
    expect(homeMeta(home, 'חדרים', 'מ״ר', 'קומה')).toBe('3 חדרים · 78 מ״ר · קומה 4');
  });
});

describe('filterHomes', () => {
  it('keeps only the selected deal type', () => {
    expect(filterHomes([home], 'rent')).toEqual([]);
    expect(filterHomes([home], 'sale')).toEqual([home]);
  });
});

describe('isOverdue', () => {
  it('marks past dates', () => {
    expect(isOverdue('2026-09-01', '2026-09-07')).toBe(true);
    expect(isOverdue('2026-09-10', '2026-09-07')).toBe(false);
  });
});

describe('lawyerInitials', () => {
  it('uses first letters', () => {
    expect(lawyerInitials('מיכל לוין')).toBe('מ.ל');
  });
});

describe('parseCsvList', () => {
  it('splits cloud urls', () => {
    expect(parseCsvList('https://a.jpg, https://b.jpg')).toEqual(['https://a.jpg', 'https://b.jpg']);
  });
});

describe('listedByFromFeatures', () => {
  it('reads the broker token', () => {
    expect(listedByFromFeatures(['מרפסת'])).toBe(LISTED_PRIVATE);
    expect(listedByFromFeatures([FEATURE_BROKER])).toBe(LISTED_BROKER);
  });
});

describe('mergeHomeFeatures', () => {
  it('writes elevator aircon and broker tokens', () => {
    expect(mergeHomeFeatures(['מרפסת'], LISTED_BROKER, true, true)).toEqual([
      'מרפסת',
      FEATURE_BROKER,
      FEATURE_ELEVATOR,
      FEATURE_AIRCON,
    ]);
  });
});

describe('featureLabelKey', () => {
  it('maps known tokens', () => {
    expect(featureLabelKey(FEATURE_ELEVATOR)).toBe('feature_elevator');
    expect(featureLabelKey('מרפסת')).toBe('');
  });
});

describe('filterHomesBoard', () => {
  it('filters deal listed-by and price', () => {
    const brokerHome = { ...home, features: [FEATURE_BROKER], price: null } as typeof home;
    expect(filterHomesBoard([home, brokerHome], {
      deal: 'sale',
      listedBy: LISTED_PRIVATE,
      price: PRICE_WITH,
      city: 'תל אביב',
      street: '',
    })).toEqual([home]);
    expect(filterHomesBoard([home], {
      deal: FILTER_ALL,
      listedBy: FILTER_ALL,
      price: FILTER_ALL,
      city: '',
      street: '',
    })).toEqual([home]);
  });
});

describe('homeDetailPath', () => {
  it('nests under the homes board', () => {
    expect(homeDetailPath('h1')).toBe(`${ROUTE_PROPERTY_HOMES}/h1`);
  });
});
