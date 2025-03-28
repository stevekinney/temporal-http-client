import { z } from "zod";

export const NamespaceReplicationConfigSchema = z.object({
  activeClusterName: z.string().optional(),
  clusters: z.array(z.any()).optional(),
  state: z
    .enum([
      "REPLICATION_STATE_UNSPECIFIED",
      "REPLICATION_STATE_NORMAL",
      "REPLICATION_STATE_HANDOVER",
    ])
    .optional(),
});
export type NamespaceReplicationConfigSchema = z.infer<
  typeof NamespaceReplicationConfigSchema
>;
