import type { ServiceSource } from '@clm/shared';

export interface SourceBadgeProps {
  source: ServiceSource;
  updatedAt?: string | null;
  id?: string;
  testId?: string;
}

export interface SourceBadgeUpdatedProps {
  updatedAt?: string | null;
  label: string;
  formatDate: (value: string) => string;
}
