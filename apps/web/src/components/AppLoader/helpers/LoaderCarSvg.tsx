import { COLOR_INK, COLOR_PLATE } from '@const';

export function LoaderCarSvg() {
  return (
    <svg width="46" height="26" viewBox="0 0 46 26" fill="none" aria-hidden="true">
      <g>
        <path d="M4 17c0-1.5 1-4 4-4h3l3-6c1-2 3-3 5-3h9c2 0 4 1 5 3l3 6h2c2 0 4 1.5 4 4v3c0 1-1 2-2 2h-2a4 4 0 1 1-8 0H16a4 4 0 1 1-8 0H6c-1 0-2-1-2-2v-3Z" fill={COLOR_PLATE} />
        <path d="M14 13l2-5c.6-1.2 1.7-2 3-2h7c1.3 0 2.4.8 3 2l2 5H14Z" fill={COLOR_INK} />
        <circle cx="12" cy="21" r="3" fill={COLOR_INK} />
        <circle cx="30" cy="21" r="3" fill={COLOR_INK} />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="220,0;-40,0"
          dur="1.4s"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
}
