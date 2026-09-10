import { Card, Flex, Typography } from '@forgedevstack/bear';
import { CARD_RADIUS_XL, FLEX_GAP_MD, TYPO_SECTION_TITLE } from '@const';
import { LANDING_FEATURES } from '../Landing.const';
import type { LandingFeaturesProps } from '../Landing.types';

export function LandingFeatures(props: LandingFeaturesProps) {
  const { title, translate } = props;
  return (
    <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <Flex direction="column" gap={FLEX_GAP_MD}>
        <Typography variant={TYPO_SECTION_TITLE}>{title}</Typography>
        {LANDING_FEATURES.map((key) => (
          <Typography key={key}>{translate(key)}</Typography>
        ))}
      </Flex>
    </Card>
  );
}
