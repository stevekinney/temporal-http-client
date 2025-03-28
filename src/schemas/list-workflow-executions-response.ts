import { z } from "zod";

export const ListWorkflowExecutionsResponseSchema = z.object({
  executions: z.array(z.any()).optional(),
  nextPageToken: z.string().optional(),
});
export type ListWorkflowExecutionsResponseSchema = z.infer<
  typeof ListWorkflowExecutionsResponseSchema
>;
