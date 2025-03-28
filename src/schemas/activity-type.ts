import { z } from "zod";

/**
 * Represents the identifier used by a activity author to define the activity. Typically, the
 *  name of a function. This is sometimes referred to as the activity's "name"
 */
export const ActivityTypeSchema = z
  .object({ name: z.string().optional() })
  .describe(
    'Represents the identifier used by a activity author to define the activity. Typically, the\n name of a function. This is sometimes referred to as the activity\'s "name"',
  );
export type ActivityTypeSchema = z.infer<typeof ActivityTypeSchema>;
