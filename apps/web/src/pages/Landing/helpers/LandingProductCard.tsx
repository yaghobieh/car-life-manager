import { Card, Flex, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { BOOLEAN_TRUE, CARD_RADIUS_XL, FLEX_GAP_SM, SVG_EMPTY_SIZE, TYPO_SECTION_TITLE } from '@const';
import { resolveBearId, useBearId } from '@hooks';
import type { LandingProductCardProps } from '../Landing.types';
import { LandingProductAction } from './LandingProductAction';

export function LandingProductCard(props: LandingProductCardProps) {
  const { id, testId, product, onOpen } = props;
  const t = useTranslate();
  const generatedId = useBearId('LandingProductCard');
  const domId = resolveBearId(id, generatedId);

  return (
    <Card
      id={domId}
      data-testid={testId}
      className="Bear-LandingProductCard"
      variant="outlined"
      padding="md"
      radius={CARD_RADIUS_XL}
      aria-disabled={product.enabled ? undefined : BOOLEAN_TRUE}
    >
      <Flex direction="column" gap={FLEX_GAP_SM}>
        <img src={product.iconSrc} alt="" width={SVG_EMPTY_SIZE} height={SVG_EMPTY_SIZE} />
        <Typography variant={TYPO_SECTION_TITLE}>{t(product.titleKey)}</Typography>
        <Typography>{t(product.bodyKey)}</Typography>
        <LandingProductAction
          enabled={product.enabled}
          label={t(product.ctaKey)}
          note={t('productPropertyDisabled')}
          to={product.to}
          onOpen={onOpen}
        />
      </Flex>
    </Card>
  );
}
