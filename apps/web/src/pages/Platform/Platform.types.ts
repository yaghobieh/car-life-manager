export interface PlatformProduct {
  id: string;
  to: string;
  iconSrc: string;
  titleKey: string;
  bodyKey: string;
  ctaKey: string;
  enabled: boolean;
}

export interface PlatformProductCardProps {
  id?: string;
  testId?: string;
  product: PlatformProduct;
  onOpen: (to: string) => void;
}

export interface PlatformProductOpenButtonProps {
  id?: string;
  testId?: string;
  label: string;
  to: string;
  onOpen: (to: string) => void;
}

export interface PlatformProductDisabledNoteProps {
  id?: string;
  testId?: string;
  label: string;
  note: string;
}

export interface PlatformProductActionProps {
  enabled: boolean;
  label: string;
  note: string;
  to: string;
  onOpen: (to: string) => void;
}
