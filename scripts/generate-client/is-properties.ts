export function isProperties(value: unknown): value is Properties {
  if (!value || typeof value !== 'object') return false;
  if (Array.isArray(value)) return false;

  for (const v of Object.values(value)) {
    if (typeof v !== 'string' && isProperties(v) === false) return false;
  }

  return true;
}
