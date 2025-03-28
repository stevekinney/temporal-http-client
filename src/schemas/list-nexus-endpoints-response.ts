import { z } from "zod";

export const ListNexusEndpointsResponseSchema = z.object({
  /**Token for getting the next page.*/
  nextPageToken: z
    .string()
    .describe("Token for getting the next page.")
    .optional(),
  endpoints: z.array(z.any()).optional(),
});
export type ListNexusEndpointsResponseSchema = z.infer<
  typeof ListNexusEndpointsResponseSchema
>;
