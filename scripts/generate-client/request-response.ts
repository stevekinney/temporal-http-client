import { z } from 'zod';

const HTTPMethodSchema = z.enum(['get', 'post', 'put', 'delete', 'patch']);

export function isHTTPMethod(method: string): method is HTTPMethod {
  return HTTPMethodSchema.safeParse(method).success;
}

const APIRequestResponseBodySchema = z.object({
  content: z.object({
    'application/json': z.any(),
  }),
});

export function isRequestBody(obj: unknown): obj is APIRequestResponseBody {
  return APIRequestResponseBodySchema.safeParse(obj).success;
}

const APIResponseSchema = z.object({
  200: APIRequestResponseBodySchema,
});

export function isResponse(obj: unknown): obj is APIResponse {
  return APIResponseSchema.safeParse(obj).success;
}
