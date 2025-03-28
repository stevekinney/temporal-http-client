import { z } from "zod";

export const WorkflowExecutionCanceledEventAttributesSchema = z.object({
  /**The `WORKFLOW_TASK_COMPLETED` event which this command was reported with*/
  workflowTaskCompletedEventId: z
    .string()
    .describe(
      "The `WORKFLOW_TASK_COMPLETED` event which this command was reported with",
    )
    .optional(),
  details: z.any().optional(),
});
export type WorkflowExecutionCanceledEventAttributesSchema = z.infer<
  typeof WorkflowExecutionCanceledEventAttributesSchema
>;
