import { z } from "zod";

/**The client request that triggers a Workflow Update.*/
export const RequestSchema = z
  .object({ meta: z.any().optional(), input: z.any().optional() })
  .describe("The client request that triggers a Workflow Update.");
export type RequestSchema = z.infer<typeof RequestSchema>;
