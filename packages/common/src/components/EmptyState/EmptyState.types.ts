import type { ReactNode } from 'react';

export type EmptyIconKind = 'vehicle' | 'document' | 'maintenance' | 'reminder' | 'report';

export interface EmptyStateProps {
  title: string;
  body: string;
  icon?: EmptyIconKind;
  action?: ReactNode;
  id?: string;
  testId?: string;
}
