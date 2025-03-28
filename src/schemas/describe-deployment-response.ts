import { z } from "zod";

/**[cleanup-wv-pre-release] Pre-release deployment APIs, clean up later*/
export const DescribeDeploymentResponseSchema = z
  .object({ deploymentInfo: z.any().optional() })
  .describe(
    "[cleanup-wv-pre-release] Pre-release deployment APIs, clean up later",
  );
export type DescribeDeploymentResponseSchema = z.infer<
  typeof DescribeDeploymentResponseSchema
>;
