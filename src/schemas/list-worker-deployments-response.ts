import { z } from "zod";

export const ListWorkerDeploymentsResponseSchema = z.object({
  nextPageToken: z.string().optional(),
  /**The list of worker deployments.*/
  workerDeployments: z
    .array(z.any())
    .describe("The list of worker deployments.")
    .optional(),
});
export type ListWorkerDeploymentsResponseSchema = z.infer<
  typeof ListWorkerDeploymentsResponseSchema
>;
