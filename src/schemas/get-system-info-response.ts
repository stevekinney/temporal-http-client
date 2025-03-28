import { z } from "zod";

export const GetSystemInfoResponseSchema = z.object({
  /**Version of the server.*/
  serverVersion: z.string().describe("Version of the server.").optional(),
  /**All capabilities the system supports.*/
  capabilities: z
    .any()
    .describe("All capabilities the system supports.")
    .optional(),
});
export type GetSystemInfoResponseSchema = z.infer<
  typeof GetSystemInfoResponseSchema
>;
