import { z } from "zod";

/**
 * A user-defined set of *indexed* fields that are used/exposed when listing/searching workflows.
 *  The payload is not serialized in a user-defined way.
 */
export const SearchAttributesSchema = z
  .object({ indexedFields: z.record(z.any()).optional() })
  .describe(
    "A user-defined set of *indexed* fields that are used/exposed when listing/searching workflows.\n The payload is not serialized in a user-defined way.",
  );
export type SearchAttributesSchema = z.infer<typeof SearchAttributesSchema>;
