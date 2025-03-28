import { z } from "zod";

export const Callback_NexusSchema = z.object({
  /**Callback URL.*/
  url: z.string().describe("Callback URL.").optional(),
  /**Header to attach to callback request.*/
  header: z
    .record(z.string())
    .describe("Header to attach to callback request.")
    .optional(),
});
export type Callback_NexusSchema = z.infer<typeof Callback_NexusSchema>;
