import { z } from "zod";

/**[cleanup-wv-pre-release] Pre-release deployment APIs, clean up later*/
export const SetCurrentDeploymentResponseSchema = z
  .object({
    currentDeploymentInfo: z.any().optional(),
    /**Info of the deployment that was current before executing this operation.*/
    previousDeploymentInfo: z
      .any()
      .describe(
        "Info of the deployment that was current before executing this operation.",
      )
      .optional(),
  })
  .describe(
    "[cleanup-wv-pre-release] Pre-release deployment APIs, clean up later",
  );
export type SetCurrentDeploymentResponseSchema = z.infer<
  typeof SetCurrentDeploymentResponseSchema
>;
