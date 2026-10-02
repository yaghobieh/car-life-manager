import { ZERO } from '@const';
import { ClmList, ClmSectionTitle } from '@common';
import { TaskRow } from '@components/TaskRow';
import type { TasksGroupProps } from './Tasks.types';

export function TasksGroup(props: TasksGroupProps) {
  const { title, tasks, onOpen } = props;
  if (tasks.length === ZERO) return null;
  return (
    <>
      <ClmSectionTitle title={title} />
      <ClmList>
        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} onOpen={onOpen} />
        ))}
      </ClmList>
    </>
  );
}
