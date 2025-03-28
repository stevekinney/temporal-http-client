import { z } from "zod";

export const QueryWorkflowResponseSchema = z.object({
  queryResult: z.any().optional(),
  queryRejected: z.any().optional(),
});
export type QueryWorkflowResponseSchema = z.infer<
  typeof QueryWorkflowResponseSchema
>;
