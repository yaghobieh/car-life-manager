export interface PlatformProduct {
  id: string;
  to: string;
  iconSrc: string;
  titleKey: string;
  bodyKey: string;
  ctaKey: string;
}

export interface PlatformProductCardProps {
  product: PlatformProduct;
  onOpen: (to: string) => void;
}
