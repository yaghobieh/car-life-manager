import { describe, expect, it } from 'vitest';
import { isAppBootLoading } from './AppLoader.utils';

describe('isAppBootLoading', () => {
  it('covers boot and first dashboard only', () => {
    expect(isAppBootLoading(false, false, false, false)).toBe(true);
    expect(isAppBootLoading(true, true, false, false)).toBe(true);
    expect(isAppBootLoading(true, true, true, false)).toBe(true);
    expect(isAppBootLoading(true, true, true, true)).toBe(false);
    expect(isAppBootLoading(true, false, true, true)).toBe(false);
    expect(isAppBootLoading(true, true, true, false, false)).toBe(false);
  });
});
