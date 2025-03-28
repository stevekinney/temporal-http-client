import { z } from "zod";

/**Trigger for when the workflow is closed.*/
export const CallbackInfo_WorkflowClosedSchema = z
  .object({})
  .describe("Trigger for when the workflow is closed.");
export type CallbackInfo_WorkflowClosedSchema = z.infer<
  typeof CallbackInfo_WorkflowClosedSchema
>;
