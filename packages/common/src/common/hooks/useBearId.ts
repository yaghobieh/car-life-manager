import { useState } from 'react';
import { generateBearId } from './bearId.utils';

export function useBearId(componentName: string): string {
  const [generatedId] = useState(() => generateBearId(componentName));
  return generatedId;
}
