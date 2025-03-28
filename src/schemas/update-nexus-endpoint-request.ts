import { z } from "zod";

export const UpdateNexusEndpointRequestSchema = z.object({
  /**Server-generated unique endpoint ID.*/
  id: z.string().describe("Server-generated unique endpoint ID.").optional(),
  /**Data version for this endpoint. Must match current version.*/
  version: z
    .string()
    .describe("Data version for this endpoint. Must match current version.")
    .optional(),
  spec: z.any().optional(),
});
export type UpdateNexusEndpointRequestSchema = z.infer<
  typeof UpdateNexusEndpointRequestSchema
>;
