import { useState } from 'react';
import { useTranslate } from '@forgedevstack/lingo/react';
import type { Task } from '@clm/shared';
import { ClmPageHead } from '@common';
import { TaskDrawer } from '@components/TaskDrawer';
import { useAppState } from '@hooks';
import { TasksBody } from './TasksBody';

export function Tasks() {
  const { dashboard } = useAppState();
  const t = useTranslate();
  const [openTask, setOpenTask] = useState<Task | null>(null);

  return (
    <div className="Bear-Tasks">
      <ClmPageHead title={t('tasks')} subtitle={t('pageSubTasks')} />
      <TasksBody
        tasks={dashboard?.tasks ?? []}
        onOpen={setOpenTask}
        emptyTitle={t('noTasks')}
        emptyBody={t('leftoverHelp')}
        groupLabel={t}
      />
      <TaskDrawer task={openTask} onClose={() => setOpenTask(null)} />
    </div>
  );
}
