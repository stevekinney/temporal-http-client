import { z } from "zod";

export const GetNexusEndpointResponseSchema = z.object({
  endpoint: z.any().optional(),
});
export type GetNexusEndpointResponseSchema = z.infer<
  typeof GetNexusEndpointResponseSchema
>;
