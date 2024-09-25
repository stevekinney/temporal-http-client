export function isProperties(value: unknown): value is Properties {
  if (!value || typeof value !== 'object') return false;
  if (Array.isArray(value)) return false;

  for (const v of Object.values(value)) {
    if (typeof v !== 'string' && isProperties(v) === false) return false;
  }

  return true;
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

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
}
