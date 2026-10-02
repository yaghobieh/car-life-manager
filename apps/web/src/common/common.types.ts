import type { ReactNode } from 'react';

export type ClmTone = 'good' | 'bad' | 'warn';
export type ClmButtonKind = 'primary' | 'outline';

export interface ClmPageHeadProps {
  title: string;
  subtitle?: string;
}

export interface ClmBannerProps {
  title: string;
  body: string;
  actionLabel: string;
  onAction: () => void;
  onClose: () => void;
  closeLabel: string;
}

export interface ClmHeroProps {
  eyebrow: string;
  title: string;
  plate: string;
  carSrc?: string;
  car?: ReactNode;
  carAlt: string;
  pills: Array<{ label: string; tone: ClmTone }>;
  meta: Array<{ label: string; value: string }>;
}

export interface ClmStatCardProps {
  title: string;
  value: string;
  note: string;
  iconSrc?: string;
  noteTone?: ClmTone;
}

export interface ClmSectionTitleProps {
  title: string;
}

export interface ClmListProps {
  children: ReactNode;
}

export interface ClmRowProps {
  iconSrc?: string;
  iconAlt?: string;
  title: string;
  subtitle?: ReactNode;
  action?: ReactNode;
  onClick?: () => void;
}

export interface ClmEmptyProps {
  iconSrc: string;
  title: string;
  body: string;
  action?: ReactNode;
}

export interface ClmStatusPillProps {
  label: string;
  tone: ClmTone;
}

export interface ClmButtonProps {
  kind?: ClmButtonKind;
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export interface ClmPlateProps {
  plate: string;
  compact?: boolean;
}
