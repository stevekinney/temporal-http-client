import { z } from "zod";

/**The data needed by a client to refer to a previously invoked Workflow Update.*/
export const UpdateRefSchema = z
  .object({
    workflowExecution: z.any().optional(),
    updateId: z.string().optional(),
  })
  .describe(
    "The data needed by a client to refer to a previously invoked Workflow Update.",
  );
export type UpdateRefSchema = z.infer<typeof UpdateRefSchema>;
