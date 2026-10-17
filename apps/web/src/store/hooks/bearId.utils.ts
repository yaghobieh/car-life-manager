import { ZERO } from '@const';
import { BEAR_ID_DIGIT_COUNT, BEAR_ID_LETTER, BEAR_ID_PREFIX, BEAR_ID_RADIX, BEAR_ID_SEPARATOR } from './bearId.const';

export function generateBearId(componentName: string): string {
  const digits = Array.from({ length: BEAR_ID_DIGIT_COUNT }, () =>
    Math.floor(Math.random() * BEAR_ID_RADIX).toString(BEAR_ID_RADIX),
  ).join('');
  return [BEAR_ID_PREFIX, componentName, `${BEAR_ID_LETTER}${digits}`].join(BEAR_ID_SEPARATOR);
}

export function resolveBearId(id: string | undefined, generatedId: string): string {
  return id && id.length > ZERO ? id : generatedId;
}
