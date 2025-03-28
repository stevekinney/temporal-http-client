import { z } from "zod";

export const ResetWorkflowExecutionResponseSchema = z.object({
  runId: z.string().optional(),
});
export type ResetWorkflowExecutionResponseSchema = z.infer<
  typeof ResetWorkflowExecutionResponseSchema
>;
