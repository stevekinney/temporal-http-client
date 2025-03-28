import { z } from "zod";

export const UpdateNamespaceResponseSchema = z.object({
  namespaceInfo: z.any().optional(),
  config: z.any().optional(),
  replicationConfig: z.any().optional(),
  failoverVersion: z.string().optional(),
  isGlobalNamespace: z.boolean().optional(),
});
export type UpdateNamespaceResponseSchema = z.infer<
  typeof UpdateNamespaceResponseSchema
>;
