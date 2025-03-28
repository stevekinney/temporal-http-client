import { z } from "zod";

/**ReleaseInfo contains information about specific version of temporal.*/
export const ReleaseInfoSchema = z
  .object({
    version: z.string().optional(),
    releaseTime: z.string().datetime({ offset: true }).optional(),
    notes: z.string().optional(),
  })
  .describe(
    "ReleaseInfo contains information about specific version of temporal.",
  );
export type ReleaseInfoSchema = z.infer<typeof ReleaseInfoSchema>;
