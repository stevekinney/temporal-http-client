import { z } from "zod";

/**Target to route requests to.*/
export const EndpointTargetSchema = z
  .object({ worker: z.any().optional(), external: z.any().optional() })
  .describe("Target to route requests to.");
export type EndpointTargetSchema = z.infer<typeof EndpointTargetSchema>;
