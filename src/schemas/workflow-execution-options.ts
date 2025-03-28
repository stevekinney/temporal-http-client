import { z } from "zod";

export const WorkflowExecutionOptionsSchema = z.object({
  /**If set, takes precedence over the Versioning Behavior sent by the SDK on Workflow Task completion.*/
  versioningOverride: z
    .any()
    .describe(
      "If set, takes precedence over the Versioning Behavior sent by the SDK on Workflow Task completion.",
    )
    .optional(),
});
export type WorkflowExecutionOptionsSchema = z.infer<
  typeof WorkflowExecutionOptionsSchema
>;
