import { z } from "zod";

export const CreateNexusEndpointRequestSchema = z.object({
  /**Endpoint definition to create.*/
  spec: z.any().describe("Endpoint definition to create.").optional(),
});
export type CreateNexusEndpointRequestSchema = z.infer<
  typeof CreateNexusEndpointRequestSchema
>;
