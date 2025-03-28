import { z } from "zod";

export const ListNamespacesResponseSchema = z.object({
  namespaces: z.array(z.any()).optional(),
  nextPageToken: z.string().optional(),
});
export type ListNamespacesResponseSchema = z.infer<
  typeof ListNamespacesResponseSchema
>;
