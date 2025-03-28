import { z } from "zod";

/**Used to update the user-defined metadata of a Worker Deployment Version.*/
export const UpdateWorkerDeploymentVersionMetadataRequestSchema = z
  .object({
    namespace: z.string().optional(),
    /**Deployment Version identifier in the form "<deployment_name>.<build_id>".*/
    version: z
      .string()
      .describe(
        'Deployment Version identifier in the form "<deployment_name>.<build_id>".',
      )
      .optional(),
    upsertEntries: z.record(z.any()).optional(),
    /**List of keys to remove from the metadata.*/
    removeEntries: z
      .array(z.string())
      .describe("List of keys to remove from the metadata.")
      .optional(),
  })
  .describe(
    "Used to update the user-defined metadata of a Worker Deployment Version.",
  );
export type UpdateWorkerDeploymentVersionMetadataRequestSchema = z.infer<
  typeof UpdateWorkerDeploymentVersionMetadataRequestSchema
>;
