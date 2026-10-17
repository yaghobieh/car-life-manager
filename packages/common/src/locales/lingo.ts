import { createLingo } from '@forgedevstack/lingo';
import {
  DEFAULT_LOCALE,
  FALLBACK_LOCALE,
  LINGO_STORAGE_KEY,
  LOCALE_EN,
  LOCALE_HE,
} from '@const';
import { en } from './en.const';
import { he } from './he.const';

export const lingo = createLingo({
  defaultLocale: DEFAULT_LOCALE,
  fallbackLocale: FALLBACK_LOCALE,
  locales: [LOCALE_HE, LOCALE_EN],
  cache: true,
  storageKey: LINGO_STORAGE_KEY,
  source: {
    type: 'local',
    translations: { [LOCALE_HE]: he, [LOCALE_EN]: en },
  },
});
