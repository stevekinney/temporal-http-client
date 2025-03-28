import { describe, expect, it } from 'bun:test';
import { isProperties } from './is-properties';

describe('isProperties', () => {
  it('checks if it is properties', () => {
    expect(isProperties({ name: 'string' })).toBe(true);
  });

  it('checks if it is not properties', () => {
    expect(isProperties({ name: 'string', age: 30 })).toBe(false);
  });

  it('checks if it is not properties with invalid value', () => {
    expect(isProperties({ name: 30 })).toBe(false);
  });

  it('checks if it is not properties with invalid nested value', () => {
    expect(isProperties({ name: { age: 30 } })).toBe(false);
  });
});
