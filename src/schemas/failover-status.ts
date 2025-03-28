import { z } from "zod";

/**Represents a historical replication status of a Namespace*/
export const FailoverStatusSchema = z
  .object({
    /**Timestamp when the Cluster switched to the following failover_version*/
    failoverTime: z
      .string()
      .datetime({ offset: true })
      .describe(
        "Timestamp when the Cluster switched to the following failover_version",
      )
      .optional(),
    failoverVersion: z.string().optional(),
  })
  .describe("Represents a historical replication status of a Namespace");
export type FailoverStatusSchema = z.infer<typeof FailoverStatusSchema>;
