import { z } from "zod";

export const WorkflowExecutionTerminatedEventAttributesSchema = z.object({
  /**User/client provided reason for termination*/
  reason: z
    .string()
    .describe("User/client provided reason for termination")
    .optional(),
  details: z.any().optional(),
  /**id of the client who requested termination*/
  identity: z
    .string()
    .describe("id of the client who requested termination")
    .optional(),
});
export type WorkflowExecutionTerminatedEventAttributesSchema = z.infer<
  typeof WorkflowExecutionTerminatedEventAttributesSchema
>;
