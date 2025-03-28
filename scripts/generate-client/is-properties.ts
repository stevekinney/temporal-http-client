import { z } from 'zod';

const PropertiesSchema: z.ZodType<Record<string, unknown>> = z.lazy(() =>
  z.record(z.union([z.string(), PropertiesSchema])),
);

export function isProperties(value: unknown): value is z.infer<typeof PropertiesSchema> {
  return PropertiesSchema.safeParse(value).success;
}
