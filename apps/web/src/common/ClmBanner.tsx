import { SVG_BANNER_WARN } from '@const';
import type { ClmBannerProps } from './common.types';

export function ClmBanner(props: ClmBannerProps) {
  const { title, body, actionLabel, onAction, onClose, closeLabel } = props;
  return (
    <div className="Clm-banner">
      <div className="Clm-banner-icon">
        <img src={SVG_BANNER_WARN} alt="" width={20} height={20} />
      </div>
      <div className="Clm-banner-text">
        <b>{title}</b>
        <span>{body}</span>
      </div>
      <button type="button" className="Clm-banner-cta" onClick={onAction}>{actionLabel}</button>
      <button type="button" className="Clm-banner-close" onClick={onClose} aria-label={closeLabel}>✕</button>
    </div>
  );
}
