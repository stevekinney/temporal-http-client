import { z } from "zod";

export const CallbackInfo_TriggerSchema = z.object({
  workflowClosed: z.any().optional(),
});
export type CallbackInfo_TriggerSchema = z.infer<
  typeof CallbackInfo_TriggerSchema
>;
