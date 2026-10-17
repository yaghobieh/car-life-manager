import { Badge } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { PRIORITY_BADGE_VARIANT, PRIORITY_LABEL_KEY } from './StatusBadge.const';
import type { StatusBadgeProps } from './StatusBadge.types';

export function StatusBadge({ priority }: StatusBadgeProps) {
  const t = useTranslate();
  return (
    <Badge variant={PRIORITY_BADGE_VARIANT[priority]} pill>
      {t(PRIORITY_LABEL_KEY[priority])}
    </Badge>
  );
}
