type Body = {
  content: {
    "'application/json'": string;
  };
};

type Response = {
  '200': Body;
};

export function isBody(obj: unknown): obj is Body {
  if (!obj || typeof obj !== 'object') return false;
  if (!('content' in obj)) return false;

  const content = obj['content'];

  if (!content || typeof content !== 'object') return false;
  if (!("'application/json'" in content)) return false;

  return true;
}

export function isResponse(obj: unknown): obj is Response {
  if (!obj || typeof obj !== 'object') return false;
  if (!('200' in obj)) return false;

  const body = obj['200'];

  return isBody(body);
}
