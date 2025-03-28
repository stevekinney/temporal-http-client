import { z } from "zod";

export const DescribeWorkflowExecutionResponseSchema = z.object({
  executionConfig: z.any().optional(),
  workflowExecutionInfo: z.any().optional(),
  pendingActivities: z.array(z.any()).optional(),
  pendingChildren: z.array(z.any()).optional(),
  pendingWorkflowTask: z.any().optional(),
  callbacks: z.array(z.any()).optional(),
  pendingNexusOperations: z.array(z.any()).optional(),
  workflowExtendedInfo: z.any().optional(),
});
export type DescribeWorkflowExecutionResponseSchema = z.infer<
  typeof DescribeWorkflowExecutionResponseSchema
>;
