import type { Task } from '@clm/shared';

export type TasksPageProps = Record<string, never>;

export interface TasksGroupProps {
  title: string;
  tasks: Task[];
  onOpen: (task: Task) => void;
}

export interface TasksBodyProps {
  tasks: Task[];
  onOpen: (task: Task) => void;
  emptyTitle: string;
  emptyBody: string;
  groupLabel: (key: string) => string;
}
