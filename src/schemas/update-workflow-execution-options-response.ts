import { z } from "zod";

export const UpdateWorkflowExecutionOptionsResponseSchema = z.object({
  /**Workflow Execution options after update.*/
  workflowExecutionOptions: z
    .any()
    .describe("Workflow Execution options after update.")
    .optional(),
});
export type UpdateWorkflowExecutionOptionsResponseSchema = z.infer<
  typeof UpdateWorkflowExecutionOptionsResponseSchema
>;
