import { z } from "zod";

/**A subset of WorkerDeploymentInfo*/
export const ListWorkerDeploymentsResponse_WorkerDeploymentSummarySchema = z
  .object({
    name: z.string().optional(),
    createTime: z.string().datetime({ offset: true }).optional(),
    routingConfig: z.any().optional(),
  })
  .describe("A subset of WorkerDeploymentInfo");
export type ListWorkerDeploymentsResponse_WorkerDeploymentSummarySchema =
  z.infer<typeof ListWorkerDeploymentsResponse_WorkerDeploymentSummarySchema>;
