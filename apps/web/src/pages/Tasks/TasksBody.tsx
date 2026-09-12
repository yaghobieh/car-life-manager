import { groupTasks, type Task } from '@clm/shared';
import { SVG_EMPTY_VEHICLE, ZERO } from '@const';
import { ClmEmpty } from '@common';
import { TASK_GROUP_LABEL_KEY, TASK_GROUP_ORDER } from './Tasks.const';
import { TasksGroup } from './TasksGroup';
import type { TasksBodyProps } from './Tasks.types';

export function TasksBody(props: TasksBodyProps) {
  const { tasks, onOpen, emptyTitle, emptyBody, groupLabel } = props;
  const groups = groupTasks(tasks);
  const hasTasks = TASK_GROUP_ORDER.some((groupId) => groups[groupId].length > ZERO);
  if (!hasTasks) {
    return <ClmEmpty iconSrc={SVG_EMPTY_VEHICLE} title={emptyTitle} body={emptyBody} />;
  }
  return (
    <>
      {TASK_GROUP_ORDER.map((groupId) => (
        <TasksGroup
          key={groupId}
          title={groupLabel(TASK_GROUP_LABEL_KEY[groupId])}
          tasks={groups[groupId]}
          onOpen={onOpen}
        />
      ))}
    </>
  );
}
