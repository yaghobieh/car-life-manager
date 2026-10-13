import { Button, Flex } from '@forgedevstack/bear';
import { FLEX_GAP_SM } from '@const';
import { resolveBearId, useBearId } from '@hooks';
import { LANDING_CATEGORIES } from '../Landing.const';
import type { LandingCategoryBarProps } from '../Landing.types';

export function LandingCategoryBar(props: LandingCategoryBarProps) {
  const { id, testId, translate, onSelect } = props;
  const generatedId = useBearId('LandingCategoryBar');
  const domId = resolveBearId(id, generatedId);

  return (
    <Flex id={domId} data-testid={testId} className="Bear-Landing__categories" gap={FLEX_GAP_SM} wrap="wrap">
      {LANDING_CATEGORIES.map((category) => (
        <Button key={category.id} variant="ghost" onClick={() => onSelect(category.id)}>
          {translate(category.labelKey)}
        </Button>
      ))}
    </Flex>
  );
}
