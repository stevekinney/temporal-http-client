/*
 * Serialized an object or collection of objects that implement a `serialize` method.
 */
export function serialize<T extends { serialize: () => unknown }>(
  obj: T | T[] | Record<string, T>,
) {
  if ('serialize' in obj && typeof obj.serialize === 'function') {
    return JSON.stringify(obj.serialize(), null, 2);
  }

  if (Array.isArray(obj)) {
    return JSON.stringify(obj.map((ts) => ts.serialize()));
  }

  return JSON.stringify(
    Object.values(obj).reduce((acc, ts) => ({ ...acc, [ts.name]: ts.serialize() }), {}),
    null,
    2,
  );
}
