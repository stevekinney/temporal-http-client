import { z } from "zod";

export const Link_WorkflowEventSchema = z.object({
  namespace: z.string().optional(),
  workflowId: z.string().optional(),
  runId: z.string().optional(),
  eventRef: z.any().optional(),
});
export type Link_WorkflowEventSchema = z.infer<typeof Link_WorkflowEventSchema>;
