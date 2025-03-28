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
