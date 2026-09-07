import { Flex, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { COLOR_BLUE, COLOR_INK, COLOR_MUTED_2, COLOR_WHITE, FLEX_GAP_SM, LOGO_PRODUCT_PLATFORM, SVG_LOGO_SIZE } from '@const';
import { SvgAsset } from '@components/SvgAsset';
import { LOGO_MARK, LOGO_WORD } from './Logo.const';
import type { LogoProps } from './Logo.types';

export function Logo(props: LogoProps) {
  const { compact = false, onDark = false, product = LOGO_PRODUCT_PLATFORM } = props;
  const t = useTranslate();
  const wordColor = onDark ? COLOR_WHITE : COLOR_INK;
  const word = LOGO_WORD[product];
  return (
    <Flex className="Bear-Logo" align="center" gap={FLEX_GAP_SM} aria-label={t('brand')}>
      <SvgAsset src={LOGO_MARK[product]} alt={t('brand')} width={SVG_LOGO_SIZE} height={SVG_LOGO_SIZE} />
      {!compact && (
        <Flex direction="column">
          <Flex align="center">
            <Typography weight="extrabold" color={wordColor}>{word.lead}</Typography>
            <Typography weight="extrabold" color={COLOR_BLUE}>{word.accent}</Typography>
          </Flex>
          <Typography color={COLOR_MUTED_2}>{t('tagline')}</Typography>
        </Flex>
      )}
    </Flex>
  );
}
