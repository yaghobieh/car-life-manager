import { describe, expect, it } from 'vitest';
import { addressSubtitle, addressTitle } from './Property.utils';

describe('addressTitle', () => {
  it('prefers the official street name', () => {
    expect(addressTitle({
      id: 'street-1',
      kind: 'street',
      city: 'תל אביב-יפו',
      street: 'דיזנגוף',
      cityCode: '5000',
      streetCode: '123',
      region: 'תל אביב',
      source: 'official',
    })).toBe('דיזנגוף');
  });
});

describe('addressSubtitle', () => {
  it('joins city and region', () => {
    expect(addressSubtitle({
      id: 'street-1',
      kind: 'street',
      city: 'תל אביב-יפו',
      street: 'דיזנגוף',
      cityCode: '5000',
      streetCode: '123',
      region: 'תל אביב',
      source: 'official',
    }, 'עיר')).toBe('תל אביב-יפו • תל אביב');
  });
});
