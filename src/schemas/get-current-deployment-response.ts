import { z } from "zod";

/**[cleanup-wv-pre-release] Pre-release deployment APIs, clean up later*/
export const GetCurrentDeploymentResponseSchema = z
  .object({ currentDeploymentInfo: z.any().optional() })
  .describe(
    "[cleanup-wv-pre-release] Pre-release deployment APIs, clean up later",
  );
export type GetCurrentDeploymentResponseSchema = z.infer<
  typeof GetCurrentDeploymentResponseSchema
>;
