import { Card, Flex, Typography } from '@forgedevstack/bear';
import { CARD_RADIUS_XL, FLEX_GAP_MD, TYPO_SECTION_TITLE } from '@const';
import { LANDING_PRODUCTS } from '../Landing.const';
import type { LandingProductsProps } from '../Landing.types';
import { LandingProductCard } from './LandingProductCard';

export function LandingProducts(props: LandingProductsProps) {
  const { title, onOpen } = props;
  return (
    <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <Flex direction="column" gap={FLEX_GAP_MD}>
        <Typography variant={TYPO_SECTION_TITLE}>{title}</Typography>
        <Flex gap={FLEX_GAP_MD} wrap="wrap">
          {LANDING_PRODUCTS.map((product) => (
            <LandingProductCard key={product.id} product={product} onOpen={onOpen} />
          ))}
        </Flex>
      </Flex>
    </Card>
  );
}
