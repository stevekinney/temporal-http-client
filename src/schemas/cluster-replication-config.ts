import { z } from "zod";

export const ClusterReplicationConfigSchema = z.object({
  clusterName: z.string().optional(),
});
export type ClusterReplicationConfigSchema = z.infer<
  typeof ClusterReplicationConfigSchema
>;
