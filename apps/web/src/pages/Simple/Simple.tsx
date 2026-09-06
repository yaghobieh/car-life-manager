import { Card } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { CARD_RADIUS_XL } from '@const';
import { EmptyState } from '@components/EmptyState';
import type { SimpleProps } from './Simple.types';

export function Simple({ titleKey, bodyKey }: SimpleProps) {
  const t = useTranslate();
  return (
    <Card className="Bear-Simple" variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <EmptyState title={t(titleKey)} body={t(bodyKey)} />
    </Card>
  );
}
