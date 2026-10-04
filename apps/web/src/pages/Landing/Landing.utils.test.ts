import { describe, expect, it } from 'vitest';
import { ADDRESS_QUERY_PARAM, HOME_INTENT_EXISTING, HOME_INTENT_QUERY, ROUTE_CAR, ROUTE_PROPERTY_HOMES, ROUTE_PROPERTY_SEARCH } from '@const';
import { LANDING_CATEGORY_CAR, LANDING_CATEGORY_EXISTING, LANDING_CATEGORY_INTEREST } from './Landing.const';
import {
  cycleThemeMode,
  filterMatchedCities,
  formatAddressLabel,
  landingNextPath,
  landingSearchPath,
} from './Landing.utils';

describe('landingNextPath', () => {
  it('sends car to the car app', () => {
    expect(landingNextPath(LANDING_CATEGORY_CAR)).toBe(ROUTE_CAR);
  });

  it('sends an existing apartment to owned homes', () => {
    expect(landingNextPath(LANDING_CATEGORY_EXISTING)).toBe(
      `${ROUTE_PROPERTY_HOMES}?${HOME_INTENT_QUERY}=${HOME_INTENT_EXISTING}`,
    );
  });

  it('sends interest to the homes board', () => {
    expect(landingNextPath(LANDING_CATEGORY_INTEREST)).toContain(ROUTE_PROPERTY_HOMES);
  });
});

describe('landingSearchPath', () => {
  it('opens property search when the query is empty', () => {
    expect(landingSearchPath('  ')).toBe(ROUTE_PROPERTY_SEARCH);
  });

  it('keeps the typed address on the search path', () => {
    expect(landingSearchPath('תל אביב')).toBe(
      `${ROUTE_PROPERTY_SEARCH}?${ADDRESS_QUERY_PARAM}=${encodeURIComponent('תל אביב')}`,
    );
  });
});

describe('filterMatchedCities', () => {
  const cities = ['תל אביב', 'ירושלים', 'חיפה', 'פתח תקווה', 'באר שבע', 'צפת'];

  it('matches פת to פתח תקווה and צפת', () => {
    const matched = filterMatchedCities(cities, 'פת');
    expect(matched).toContain('פתח תקווה');
    expect(matched).toContain('צפת');
    expect(matched).not.toContain('חיפה');
  });

  it('returns empty array when query is empty', () => {
    expect(filterMatchedCities(cities, '')).toEqual([]);
    expect(filterMatchedCities(cities, '   ')).toEqual([]);
  });
});

describe('cycleThemeMode', () => {
  it('cycles in 3 clicks: light -> dark -> system -> light', () => {
    expect(cycleThemeMode('light')).toBe('dark');
    expect(cycleThemeMode('dark')).toBe('system');
    expect(cycleThemeMode('system')).toBe('light');
  });
});

describe('formatAddressLabel', () => {
  it('formats street and city', () => {
    expect(formatAddressLabel({ city: 'פתח תקווה', street: 'כביש פת תא' })).toBe('כביש פת תא, פתח תקווה');
  });

  it('formats city only when street is omitted', () => {
    expect(formatAddressLabel({ city: 'פתח תקווה' })).toBe('פתח תקווה');
  });
});

describe('updateSocialMetaTags', () => {
  it('updates title, og tags, and json-ld script for scrapers', () => {
    import('./Landing.utils').then(({ updateSocialMetaTags }) => {
      updateSocialMetaTags({
        title: 'דירת 4 חדרים בפתח תקווה',
        desc: 'דירה מדהימה ברוטשילד',
        imageUrl: 'https://images.unsplash.com/sample.jpg',
        url: 'http://localhost:5173/item/a7',
        price: 3150000,
        type: 'apt',
      });
      expect(document.title).toContain('דירת 4 חדרים בפתח תקווה');
      const ogTitle = document.querySelector('meta[property="og:title"]');
      expect(ogTitle?.getAttribute('content')).toContain('דירת 4 חדרים בפתח תקווה');
      const jsonLd = document.getElementById('tavo-jsonld');
      expect(jsonLd?.textContent).toContain('RealEstateListing');
    });
  });
});

