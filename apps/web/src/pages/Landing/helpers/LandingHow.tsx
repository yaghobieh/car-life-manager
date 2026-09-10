import { Badge, Card, Flex, Typography } from '@forgedevstack/bear';
import { CARD_RADIUS_XL, FLEX_GAP_MD, FLEX_GAP_SM, TYPO_SECTION_TITLE } from '@const';
import { LANDING_STEPS } from '../Landing.const';
import type { LandingHowProps } from '../Landing.types';

export function LandingHow(props: LandingHowProps) {
  const { title, translate } = props;
  return (
    <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <Flex direction="column" gap={FLEX_GAP_MD}>
        <Typography variant={TYPO_SECTION_TITLE}>{title}</Typography>
        <Flex gap={FLEX_GAP_MD} wrap="wrap">
          {LANDING_STEPS.map((item) => (
            <Card key={item.step} variant="outlined" padding="md" radius="lg" className="bear-flex-1">
              <Flex direction="column" gap={FLEX_GAP_SM}>
                <Badge variant="primary" pill>{item.step}</Badge>
                <Typography>{translate(item.labelKey)}</Typography>
              </Flex>
            </Card>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
}
