import { Button, Card, Flex, Typography } from '@forgedevstack/bear';
import { CARD_RADIUS_XL, COLOR_TEXT, COLOR_TEXT_MUTED, FLEX_GAP_MD, FLEX_GAP_SM, TYPO_SECTION_TITLE } from '@const';
import type { LandingPathsProps } from '../Landing.types';

export function LandingPaths(props: LandingPathsProps) {
  const { title, body, carTitle, carBody, carLabel, homeTitle, homeBody, existingLabel, interestLabel, onCar, onExisting, onInterest } = props;
  return (
    <Flex direction="column" gap={FLEX_GAP_MD}>
      <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL} className="Bear-Landing__tile">
        <Flex direction="column" gap={FLEX_GAP_SM}>
          <Typography variant={TYPO_SECTION_TITLE} color={COLOR_TEXT}>{title}</Typography>
          <Typography color={COLOR_TEXT_MUTED}>{body}</Typography>
        </Flex>
      </Card>
      <Flex gap={FLEX_GAP_MD} wrap="wrap">
        <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL} className="Bear-Landing__tile Bear-Landing__tile--grow">
          <Flex direction="column" gap={FLEX_GAP_SM}>
            <Typography variant={TYPO_SECTION_TITLE} color={COLOR_TEXT}>{carTitle}</Typography>
            <Typography color={COLOR_TEXT_MUTED}>{carBody}</Typography>
            <Button variant="primary" onClick={onCar}>{carLabel}</Button>
          </Flex>
        </Card>
        <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL} className="Bear-Landing__tile Bear-Landing__tile--grow">
          <Flex direction="column" gap={FLEX_GAP_SM}>
            <Typography variant={TYPO_SECTION_TITLE} color={COLOR_TEXT}>{homeTitle}</Typography>
            <Typography color={COLOR_TEXT_MUTED}>{homeBody}</Typography>
            <Button variant="primary" onClick={onExisting}>{existingLabel}</Button>
            <Button variant="ghost" onClick={onInterest}>{interestLabel}</Button>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
}
