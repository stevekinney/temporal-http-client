import { z } from "zod";

/**See `Payload`*/
export const PayloadsSchema = z
  .object({ payloads: z.array(z.any()).optional() })
  .describe("See `Payload`");
export type PayloadsSchema = z.infer<typeof PayloadsSchema>;
