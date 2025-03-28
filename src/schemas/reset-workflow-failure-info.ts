import { z } from "zod";

export const ResetWorkflowFailureInfoSchema = z.object({
  lastHeartbeatDetails: z.any().optional(),
});
export type ResetWorkflowFailureInfoSchema = z.infer<
  typeof ResetWorkflowFailureInfoSchema
>;
