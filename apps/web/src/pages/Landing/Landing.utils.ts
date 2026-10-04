import {
  ADDRESS_QUERY_PARAM,
  HOME_INTENT_EXISTING,
  HOME_INTENT_INTEREST,
  HOME_INTENT_QUERY,
  ROUTE_CAR,
  ROUTE_PROPERTY_HOMES,
  ROUTE_PROPERTY_SEARCH,
} from '@const';
import {
  LANDING_CATEGORY_CAR,
  LANDING_CATEGORY_EXISTING,
  LANDING_CATEGORY_INTEREST,
} from './Landing.const';

const LANDING_NEXT_PATH: Record<string, string> = {
  [LANDING_CATEGORY_CAR]: ROUTE_CAR,
  [LANDING_CATEGORY_EXISTING]: `${ROUTE_PROPERTY_HOMES}?${HOME_INTENT_QUERY}=${HOME_INTENT_EXISTING}`,
  [LANDING_CATEGORY_INTEREST]: `${ROUTE_PROPERTY_HOMES}?${HOME_INTENT_QUERY}=${HOME_INTENT_INTEREST}`,
};

export function landingNextPath(categoryId: string): string {
  return LANDING_NEXT_PATH[categoryId] ?? ROUTE_CAR;
}

export function landingSearchPath(query: string): string {
  const trimmed = query.trim();
  if (!trimmed) return ROUTE_PROPERTY_SEARCH;
  return `${ROUTE_PROPERTY_SEARCH}?${ADDRESS_QUERY_PARAM}=${encodeURIComponent(trimmed)}`;
}

export type ThemeChoice = 'light' | 'dark' | 'system';

export function cycleThemeMode(current: ThemeChoice): ThemeChoice {
  if (current === 'light') return 'dark';
  if (current === 'dark') return 'system';
  return 'light';
}

export function filterMatchedCities(cities: string[], query: string): string[] {
  const trimmed = query.trim();
  if (!trimmed) return [];
  return cities.filter((c) => c.includes(trimmed) || trimmed.includes(c));
}

export function formatAddressLabel(item: { city: string; street?: string }): string {
  return item.street ? `${item.street}, ${item.city}` : item.city;
}

export function updateSocialMetaTags(item?: {
  title: string;
  desc: string;
  imageUrl?: string;
  url: string;
  price?: number;
  type?: string;
}): void {
  if (typeof document === 'undefined') return;

  const title = item ? `${item.title} | Tavo — טאבו` : 'Tavo — טאבו | פלטפורמת רכבים ודירות בישראל';
  const desc = item?.desc || 'חיפוש, קנייה, השכרה וניהול רכבים ודירות בישראל במקום אחד.';
  const image = item?.imageUrl || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80';
  const url = item?.url || (typeof window !== 'undefined' ? window.location.href : '');

  document.title = title;

  function setMeta(property: string, content: string, isName = false) {
    const selector = isName ? `meta[name="${property}"]` : `meta[property="${property}"]`;
    let el = document.querySelector(selector) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      if (isName) el.setAttribute('name', property);
      else el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  setMeta('robots', 'index, follow, max-image-preview:large', true);
  setMeta('googlebot', 'index, follow, max-snippet:-1, max-image-preview:large', true);
  setMeta('description', desc, true);
  setMeta('og:title', title);
  setMeta('og:description', desc);
  setMeta('og:image', image);
  setMeta('og:url', url);
  setMeta('og:type', item ? 'article' : 'website');
  setMeta('og:site_name', 'Tavo');
  setMeta('twitter:card', 'summary_large_image', true);
  setMeta('twitter:title', title, true);
  setMeta('twitter:description', desc, true);
  setMeta('twitter:image', image, true);

  let scriptEl = document.getElementById('tavo-jsonld') as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'tavo-jsonld';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  const structuredData = item
    ? {
        '@context': 'https://schema.org',
        '@type': item.type === 'car' ? 'Vehicle' : 'RealEstateListing',
        name: item.title,
        description: item.desc,
        image: image,
        offers: {
          '@type': 'Offer',
          price: item.price ?? 0,
          priceCurrency: 'ILS',
          availability: 'https://schema.org/InStock',
        },
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Tavo',
        url: typeof window !== 'undefined' ? window.location.origin : '',
      };

  scriptEl.textContent = JSON.stringify(structuredData);
}

