import { useState } from 'react';
import { useTranslate } from '@forgedevstack/lingo/react';
import { groupTasks, type Task } from '@clm/shared';
import { SVG_EMPTY_VEHICLE, ZERO } from '@const';
import { ClmEmpty, ClmList, ClmPageHead } from '@common';
import { TaskDrawer } from '@components/TaskDrawer';
import { TaskRow } from '@components/TaskRow';
import { useAppState } from '@hooks';
import { flattenGroupedTasks } from './Tasks.utils';

export function Tasks() {
  const { dashboard } = useAppState();
  const t = useTranslate();
  const [openTask, setOpenTask] = useState<Task | null>(null);
  const tasks = flattenGroupedTasks(groupTasks(dashboard?.tasks ?? []));

  return (
    <div className="Bear-Tasks">
      <ClmPageHead title={t('tasks')} subtitle={t('pageSubTasks')} />
      {tasks.length === ZERO ? (
        <ClmEmpty iconSrc={SVG_EMPTY_VEHICLE} title={t('noTasks')} body={t('leftoverHelp')} />
      ) : (
        <ClmList>
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} onOpen={setOpenTask} />
          ))}
        </ClmList>
      )}
      <TaskDrawer task={openTask} onClose={() => setOpenTask(null)} />
    </div>
  );
}
