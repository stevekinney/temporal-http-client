export function isHTTPMethod(method: string): method is HTTPMethod {
  return ['get', 'post', 'put', 'delete', 'patch'].includes(method);
}

export function isRequestBody(obj: unknown): obj is APIRequestResponseBody {
  if (!obj || typeof obj !== 'object') return false;
  if (!('content' in obj)) return false;

  const content = obj['content'];

  if (!content || typeof content !== 'object') return false;
  if (!("'application/json'" in content)) return false;

  return true;
}

export function isResponse(obj: unknown): obj is APIResponse {
  if (!obj || typeof obj !== 'object') return false;
  if (!('200' in obj)) return false;

  const body = obj['200'];

  return isRequestBody(body);
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('isHTTPMethod', () => {
    it('checks if it is an HTTP method', () => {
      expect(isHTTPMethod('get')).toBe(true);
      expect(isHTTPMethod('post')).toBe(true);
      expect(isHTTPMethod('put')).toBe(true);
      expect(isHTTPMethod('delete')).toBe(true);
      expect(isHTTPMethod('patch')).toBe(true);
      expect(isHTTPMethod('head')).toBe(false);
    });

    it('checks if it not is an HTTP method', () => {
      expect(isHTTPMethod('head')).toBe(false);
    });
  });

  describe('isResponse', () => {
    it('checks if it is a response', () => {
      expect(isResponse({ '200': { content: { "'application/json'": {} } } })).toBe(true);
    });

    it('checks if it is not a response', () => {
      expect(isResponse({})).toBe(false);
    });

    it('checks if it is not a response without content', () => {
      expect(isResponse({ '200': {} })).toBe(false);
    });
  });

  describe('isRequestBody', () => {
    it('checks if it is a request body', () => {
      expect(isRequestBody({ content: { "'application/json'": {} } })).toBe(true);
    });

    it('checks if it is not a request body', () => {
      expect(isRequestBody({})).toBe(false);
    });

    it('checks if it is not a request body without content', () => {
      expect(isRequestBody({})).toBe(false);
    });
  });
}
