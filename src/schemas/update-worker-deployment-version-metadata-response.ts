import { z } from "zod";

export const UpdateWorkerDeploymentVersionMetadataResponseSchema = z.object({
  /**Full metadata after performing the update.*/
  metadata: z
    .any()
    .describe("Full metadata after performing the update.")
    .optional(),
});
export type UpdateWorkerDeploymentVersionMetadataResponseSchema = z.infer<
  typeof UpdateWorkerDeploymentVersionMetadataResponseSchema
>;
