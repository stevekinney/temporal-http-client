import { z } from "zod";

/**Metadata about a Workflow Update.*/
export const MetaSchema = z
  .object({
    /**An ID with workflow-scoped uniqueness for this Update.*/
    updateId: z
      .string()
      .describe("An ID with workflow-scoped uniqueness for this Update.")
      .optional(),
    /**A string identifying the agent that requested this Update.*/
    identity: z
      .string()
      .describe("A string identifying the agent that requested this Update.")
      .optional(),
  })
  .describe("Metadata about a Workflow Update.");
export type MetaSchema = z.infer<typeof MetaSchema>;
