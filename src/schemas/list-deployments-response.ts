import { z } from "zod";

/**[cleanup-wv-pre-release] Pre-release deployment APIs, clean up later*/
export const ListDeploymentsResponseSchema = z
  .object({
    nextPageToken: z.string().optional(),
    deployments: z.array(z.any()).optional(),
  })
  .describe(
    "[cleanup-wv-pre-release] Pre-release deployment APIs, clean up later",
  );
export type ListDeploymentsResponseSchema = z.infer<
  typeof ListDeploymentsResponseSchema
>;
