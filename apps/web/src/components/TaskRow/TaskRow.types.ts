import type { Task } from '@clm/shared';

export interface TaskRowProps {
  task: Task;
  onOpen?: (task: Task) => void;
  id?: string;
  testId?: string;
}

export interface TaskRowLinkProps {
  href: string | null;
  label: string;
}

export interface TaskRowCompleteProps {
  done: boolean;
  busy: boolean;
  label: string;
  loadingText: string;
  onComplete: () => void;
}
