import { z } from "zod";

/**
 * Represents the identifier used by a workflow author to define the workflow. Typically, the
 *  name of a function. This is sometimes referred to as the workflow's "name"
 */
export const WorkflowTypeSchema = z
  .object({ name: z.string().optional() })
  .describe(
    'Represents the identifier used by a workflow author to define the workflow. Typically, the\n name of a function. This is sometimes referred to as the workflow\'s "name"',
  );
export type WorkflowTypeSchema = z.infer<typeof WorkflowTypeSchema>;
