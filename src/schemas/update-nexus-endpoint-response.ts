import { z } from "zod";

export const UpdateNexusEndpointResponseSchema = z.object({
  /**Data post acceptance. Can be used to issue additional updates to this record.*/
  endpoint: z
    .any()
    .describe(
      "Data post acceptance. Can be used to issue additional updates to this record.",
    )
    .optional(),
});
export type UpdateNexusEndpointResponseSchema = z.infer<
  typeof UpdateNexusEndpointResponseSchema
>;
