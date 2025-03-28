import { z } from "zod";

export const CreateNexusEndpointResponseSchema = z.object({
  /**Data post acceptance. Can be used to issue additional updates to this record.*/
  endpoint: z
    .any()
    .describe(
      "Data post acceptance. Can be used to issue additional updates to this record.",
    )
    .optional(),
});
export type CreateNexusEndpointResponseSchema = z.infer<
  typeof CreateNexusEndpointResponseSchema
>;
