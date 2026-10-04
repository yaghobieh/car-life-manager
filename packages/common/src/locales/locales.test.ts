import { describe, expect, it } from 'vitest';
import { en } from './en.const';
import { he } from './he.const';

describe('locale keys', () => {
  it('keeps Hebrew and English keys 1:1', () => {
    expect(Object.keys(he).sort()).toEqual(Object.keys(en).sort());
  });
});
