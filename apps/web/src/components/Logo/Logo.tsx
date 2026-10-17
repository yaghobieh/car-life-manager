import { Flex, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { COLOR_BLUE, COLOR_INK, COLOR_MUTED_2, COLOR_WHITE, FLEX_GAP_SM, SVG_LOGO_MARK, SVG_LOGO_SIZE } from '@const';
import { SvgAsset } from '@components/SvgAsset';
import type { LogoProps } from './Logo.types';

export function Logo({ compact = false, onDark = false }: LogoProps) {
  const t = useTranslate();
  const wordColor = onDark ? COLOR_WHITE : COLOR_INK;
  return (
    <Flex className="Bear-Logo" align="center" gap={FLEX_GAP_SM} aria-label={t('brand')}>
      <SvgAsset src={SVG_LOGO_MARK} alt={t('brand')} width={SVG_LOGO_SIZE} height={SVG_LOGO_SIZE} />
      {!compact && (
        <Flex direction="column">
          <Flex align="center">
            <Typography weight="extrabold" color={wordColor}>Car</Typography>
            <Typography weight="extrabold" color={COLOR_BLUE}>Life</Typography>
          </Flex>
          <Typography color={COLOR_MUTED_2}>{t('tagline')}</Typography>
        </Flex>
      )}
    </Flex>
  );
}
