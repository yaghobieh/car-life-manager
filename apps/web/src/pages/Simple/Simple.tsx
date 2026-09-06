import { Card } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { EmptyState } from '@components/EmptyState';
import type { SimpleProps } from './Simple.types';

export function Simple({ titleKey, bodyKey }: SimpleProps) {
  const t = useTranslate();
  return (
    <Card className="Bear-Simple" variant="elevated" padding="lg">
      <EmptyState title={t(titleKey)} body={t(bodyKey)} />
    </Card>
  );
}
