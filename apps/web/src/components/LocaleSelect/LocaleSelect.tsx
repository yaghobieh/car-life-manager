import { Select } from '@forgedevstack/bear';
import { useLocale, useTranslate } from '@forgedevstack/lingo/react';
import { LOCALE_EN, LOCALE_HE } from '@const';
import { LOCALE_OPTION_KEYS } from './LocaleSelect.const';
import type { LocaleSelectProps } from './LocaleSelect.types';

export function LocaleSelect(props: LocaleSelectProps) {
  const { id, fullWidth } = props;
  const { locale, setLocale } = useLocale();
  const t = useTranslate();

  return (
    <Select
      id={id}
      aria-label={t('language')}
      value={locale}
      fullWidth={fullWidth}
      onChange={(value) => {
        void setLocale(value);
      }}
      options={[
        { value: LOCALE_HE, label: t(LOCALE_OPTION_KEYS[LOCALE_HE]) },
        { value: LOCALE_EN, label: t(LOCALE_OPTION_KEYS[LOCALE_EN]) },
      ]}
    />
  );
}
