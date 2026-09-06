import { useState } from 'react';
import { Card, Flex, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import { groupTasks, type Task, type TaskGroupId } from '@clm/shared';
import {
  CARD_RADIUS_XL,
  FLEX_GAP_LG,
  FLEX_GAP_MD,
  TASK_GROUP_DONE,
  TASK_GROUP_LATER,
  TASK_GROUP_URGENT,
  TASK_GROUP_WEEK,
  TYPO_SECTION_TITLE,
  ZERO,
} from '@const';
import { EmptyState } from '@components/EmptyState';
import { PageHeader } from '@components/PageHeader';
import { TaskDrawer } from '@components/TaskDrawer';
import { TaskRow } from '@components/TaskRow';
import { useAppState } from '@hooks';

const GROUPS: Array<{ id: TaskGroupId; labelKey: string }> = [
  { id: TASK_GROUP_URGENT, labelKey: 'groupUrgent' },
  { id: TASK_GROUP_WEEK, labelKey: 'groupWeek' },
  { id: TASK_GROUP_LATER, labelKey: 'groupLater' },
  { id: TASK_GROUP_DONE, labelKey: 'groupDone' },
];

export function Tasks() {
  const { dashboard } = useAppState();
  const t = useTranslate();
  const [openTask, setOpenTask] = useState<Task | null>(null);
  const tasks = dashboard?.tasks ?? [];
  const groups = groupTasks(tasks);

  if (tasks.length === ZERO) {
    return (
      <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
        <EmptyState title={t('noTasks')} body={t('leftoverHelp')} />
      </Card>
    );
  }

  return (
    <Flex className="Bear-Tasks" direction="column" gap={FLEX_GAP_LG}>
      <PageHeader title={t('tasks')} subtitle={t('pageSubTasks')} />
    <Card variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <Flex direction="column" gap={FLEX_GAP_LG}>
        {GROUPS.map((group) => (
          <Flex key={group.id} direction="column" gap={FLEX_GAP_MD}>
            <Typography variant={TYPO_SECTION_TITLE}>{t(group.labelKey)}</Typography>
            {groups[group.id].length === ZERO && <Typography>{t('noTasks')}</Typography>}
            {groups[group.id].map((task) => (
              <TaskRow key={task.id} task={task} onOpen={setOpenTask} />
            ))}
          </Flex>
        ))}
      </Flex>
      <TaskDrawer task={openTask} onClose={() => setOpenTask(null)} />
    </Card>
    </Flex>
  );
}
