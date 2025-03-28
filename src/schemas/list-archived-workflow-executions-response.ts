import { z } from "zod";

export const ListArchivedWorkflowExecutionsResponseSchema = z.object({
  executions: z.array(z.any()).optional(),
  nextPageToken: z.string().optional(),
});
export type ListArchivedWorkflowExecutionsResponseSchema = z.infer<
  typeof ListArchivedWorkflowExecutionsResponseSchema
>;
