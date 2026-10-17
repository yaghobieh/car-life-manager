import { Box, Select } from '@forgedevstack/bear';
import { useLocale, useTranslate } from '@forgedevstack/lingo/react';
import { LOCALE_EN, LOCALE_HE, LOCALE_SELECT_MIN_WIDTH } from '@const';
import { LOCALE_OPTION_KEYS } from './LocaleSelect.const';
import type { LocaleSelectProps } from './LocaleSelect.types';

export function LocaleSelect(props: LocaleSelectProps) {
  const { id, fullWidth, showLabel = true } = props;
  const { locale, setLocale } = useLocale();
  const t = useTranslate();

  return (
    <Box
      className="Bear-LocaleSelect"
      style={{
        minWidth: LOCALE_SELECT_MIN_WIDTH,
        width: fullWidth ? '100%' : LOCALE_SELECT_MIN_WIDTH,
      }}
    >
      <Select
        id={id}
        aria-label={t('language')}
        label={showLabel ? t('language') : undefined}
        size="md"
        value={locale}
        fullWidth
        onChange={(value) => {
          void setLocale(value);
        }}
        options={[
          { value: LOCALE_HE, label: t(LOCALE_OPTION_KEYS[LOCALE_HE]) },
          { value: LOCALE_EN, label: t(LOCALE_OPTION_KEYS[LOCALE_EN]) },
        ]}
      />
    </Box>
  );
}
