import { z } from "zod";

export const DescribeWorkerDeploymentResponseSchema = z.object({
  /**
   * This value is returned so that it can be optionally passed to APIs
   *  that write to the Worker Deployment state to ensure that the state
   *  did not change between this read and a future write.
   */
  conflictToken: z
    .string()
    .describe(
      "This value is returned so that it can be optionally passed to APIs\n that write to the Worker Deployment state to ensure that the state\n did not change between this read and a future write.",
    )
    .optional(),
  workerDeploymentInfo: z.any().optional(),
});
export type DescribeWorkerDeploymentResponseSchema = z.infer<
  typeof DescribeWorkerDeploymentResponseSchema
>;
