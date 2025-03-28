import { z } from "zod";

/**A user-defined set of *unindexed* fields that are exposed when listing/searching workflows*/
export const MemoSchema = z
  .object({ fields: z.record(z.any()).optional() })
  .describe(
    "A user-defined set of *unindexed* fields that are exposed when listing/searching workflows",
  );
export type MemoSchema = z.infer<typeof MemoSchema>;
