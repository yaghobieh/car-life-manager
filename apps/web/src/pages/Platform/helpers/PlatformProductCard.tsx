import { Box, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { BOOLEAN_TRUE, SVG_EMPTY_SIZE, TYPO_SECTION_TITLE } from '@const';
import { resolveBearId, useBearId } from '@hooks';
import type { PlatformProductCardProps } from '../Platform.types';
import { PlatformProductAction } from './PlatformProductAction';

export function PlatformProductCard(props: PlatformProductCardProps) {
  const { id, testId, product, onOpen } = props;
  const t = useTranslate();
  const generatedId = useBearId('PlatformProductCard');
  const domId = resolveBearId(id, generatedId);

  return (
    <Box
      id={domId}
      data-testid={testId}
      className="Bear-PlatformProductCard Clm-product-card"
      aria-disabled={product.enabled ? undefined : BOOLEAN_TRUE}
    >
      <img src={product.iconSrc} alt="" width={SVG_EMPTY_SIZE} height={SVG_EMPTY_SIZE} />
      <Typography variant={TYPO_SECTION_TITLE}>{t(product.titleKey)}</Typography>
      <Typography>{t(product.bodyKey)}</Typography>
      <PlatformProductAction
        enabled={product.enabled}
        label={t(product.ctaKey)}
        note={t('productPropertyDisabled')}
        to={product.to}
        onOpen={onOpen}
      />
    </Box>
  );
}
