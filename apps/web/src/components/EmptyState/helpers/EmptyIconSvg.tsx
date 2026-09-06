import { COLOR_MUTED, EMPTY_ICON_DOCUMENT, EMPTY_ICON_MAINTENANCE, EMPTY_ICON_REMINDER, EMPTY_ICON_REPORT } from '@const';
import type { EmptyIconKind } from '../EmptyState.types';

export function EmptyIconSvg(props: { kind: EmptyIconKind }) {
  const { kind } = props;
  if (kind === EMPTY_ICON_DOCUMENT) {
    return (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 3h7l4 4v14H7V3Z" stroke={COLOR_MUTED} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M14 3v4h4" stroke={COLOR_MUTED} strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === EMPTY_ICON_MAINTENANCE) {
    return (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 1 5.4-5.4l-2.3 2.3-2-2 2.3-2.3Z" stroke={COLOR_MUTED} strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === EMPTY_ICON_REMINDER) {
    return (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 5a5 5 0 0 0-5 5c0 4-2 5-2 6h14c0-1-2-2-2-6a5 5 0 0 0-5-5Z" stroke={COLOR_MUTED} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M10 19a2 2 0 0 0 4 0" stroke={COLOR_MUTED} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === EMPTY_ICON_REPORT) {
    return (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 20V10M12 20V4M19 20v-7" stroke={COLOR_MUTED} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 16l1.5-5A2 2 0 0 1 6.4 9.5h11.2A2 2 0 0 1 19.5 11l1.5 5M3 16v3a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-3M3 16h18" stroke={COLOR_MUTED} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
