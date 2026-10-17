import { Card, Flex, Typography } from '@forgedevstack/bear';
import { CARD_RADIUS_XL, FLEX_GAP_MD, SPACE, TYPO_SECTION_TITLE } from '@const';
import { LANDING_STEPS } from '../Landing.const';

export function LandingHow(props: { title: string; translate: (key: string) => string }) {
  const { title, translate } = props;
  return (
    <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <Flex direction="column" gap={FLEX_GAP_MD}>
        <Typography variant={TYPO_SECTION_TITLE}>{title}</Typography>
        {LANDING_STEPS.map((item) => (
          <Typography key={item.step}>
            {item.step}.{SPACE}
            {translate(item.labelKey)}
          </Typography>
        ))}
      </Flex>
    </Card>
  );
}
