import { COLOR_BLUE, COLOR_INK } from '@const';

export function HeroCarSvg() {
  return (
    <svg className="Bear-Overview__hero-car" width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <path d="M14 70c0-6 4-16 16-16h12l10-20c3-6 9-10 16-10h30c7 0 13 4 16 10l10 20h6c6 0 10 5 10 11v11c0 3-3 6-6 6h-6a13 13 0 1 1-26 0H46a13 13 0 1 1-26 0h-6c-3 0-6-3-6-6V70Z" fill={COLOR_BLUE} />
      <path d="M42 54l6-14c2-3.5 5-6 9-6h20c4 0 7 2.5 9 6l6 14H42Z" fill={COLOR_INK} />
      <circle cx="34" cy="82" r="9" fill={COLOR_INK} />
      <circle cx="86" cy="82" r="9" fill={COLOR_INK} />
    </svg>
  );
}
