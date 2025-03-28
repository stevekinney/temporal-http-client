import { z } from "zod";

export const SignalWithStartWorkflowExecutionResponseSchema = z.object({
  /**The run id of the workflow that was started - or just signaled, if it was already running.*/
  runId: z
    .string()
    .describe(
      "The run id of the workflow that was started - or just signaled, if it was already running.",
    )
    .optional(),
  /**If true, a new workflow was started.*/
  started: z
    .boolean()
    .describe("If true, a new workflow was started.")
    .optional(),
});
export type SignalWithStartWorkflowExecutionResponseSchema = z.infer<
  typeof SignalWithStartWorkflowExecutionResponseSchema
>;
