import { COLOR_NAVY, COLOR_WHITE, LOGO_ICON_SIZE } from '@const';

export function LogoMarkSvg() {
  return (
    <svg width={LOGO_ICON_SIZE} height={LOGO_ICON_SIZE} viewBox="0 0 24 24" fill="none">
      <path d="M4 15h16l-1.5-5.5A3 3 0 0 0 15.6 7H8.4A3 3 0 0 0 5.5 9.5L4 15Z" fill={COLOR_WHITE} />
      <circle cx="7.5" cy="16.5" r="1.6" fill={COLOR_NAVY} />
      <circle cx="16.5" cy="16.5" r="1.6" fill={COLOR_NAVY} />
    </svg>
  );
}
