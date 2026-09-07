import { useTranslate } from '@forgedevstack/lingo/react';
import { SVG_EMPTY_SIZE } from '@const';
import { ClmButton } from '@common';
import type { PlatformProductCardProps } from '../Platform.types';

export function PlatformProductCard(props: PlatformProductCardProps) {
  const { product, onOpen } = props;
  const t = useTranslate();

  return (
    <article className="Clm-product-card">
      <img src={product.iconSrc} alt="" width={SVG_EMPTY_SIZE} height={SVG_EMPTY_SIZE} />
      <h2>{t(product.titleKey)}</h2>
      <p>{t(product.bodyKey)}</p>
      <ClmButton onClick={() => onOpen(product.to)}>{t(product.ctaKey)}</ClmButton>
    </article>
  );
}
