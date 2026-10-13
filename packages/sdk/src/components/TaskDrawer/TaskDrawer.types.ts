import type { Task } from '@clm/shared';

export interface TaskDrawerProps {
  task: Task | null;
  onClose: () => void;
  id?: string;
  testId?: string;
}

export interface TaskDrawerLinkProps {
  href: string | null;
  label: string;
}

export interface TaskDrawerCompleteProps {
  done: boolean;
  busy: boolean;
  label: string;
  loadingText: string;
  onComplete: () => void;
}
