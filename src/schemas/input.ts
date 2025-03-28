import { z } from "zod";

export const InputSchema = z.object({
  /**
   * Headers that are passed with the Update from the requesting entity.
   *  These can include things like auth or tracing tokens.
   */
  header: z
    .any()
    .describe(
      "Headers that are passed with the Update from the requesting entity.\n These can include things like auth or tracing tokens.",
    )
    .optional(),
  /**The name of the Update handler to invoke on the target Workflow.*/
  name: z
    .string()
    .describe(
      "The name of the Update handler to invoke on the target Workflow.",
    )
    .optional(),
  /**The arguments to pass to the named Update handler.*/
  args: z
    .any()
    .describe("The arguments to pass to the named Update handler.")
    .optional(),
});
export type InputSchema = z.infer<typeof InputSchema>;
