import { Card, Flex } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { CARD_RADIUS_XL, FLEX_GAP_LG, FLEX_GAP_MD, ZERO } from '@const';
import { EmptyState } from '@components/EmptyState';
import { TaskRow } from '@components/TaskRow';
import { useAppState } from '@hooks';

export function Tasks() {
  const { dashboard } = useAppState();
  const t = useTranslate();
  const tasks = dashboard?.tasks ?? [];

  if (tasks.length === ZERO) {
    return (
      <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
        <EmptyState title={t('noTasks')} body={t('leftoverHelp')} />
      </Card>
    );
  }

  return (
    <Card className="Bear-Tasks" variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <Flex direction="column" gap={FLEX_GAP_LG}>
        <Flex direction="column" gap={FLEX_GAP_MD}>
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </Flex>
      </Flex>
    </Card>
  );
}
