import { z } from "zod";

export const DescribeWorkerDeploymentVersionResponseSchema = z.object({
  workerDeploymentVersionInfo: z.any().optional(),
});
export type DescribeWorkerDeploymentVersionResponseSchema = z.infer<
  typeof DescribeWorkerDeploymentVersionResponseSchema
>;
