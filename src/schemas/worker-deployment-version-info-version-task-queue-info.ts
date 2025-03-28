import { z } from "zod";

export const WorkerDeploymentVersionInfo_VersionTaskQueueInfoSchema = z.object({
  name: z.string().optional(),
  type: z
    .enum([
      "TASK_QUEUE_TYPE_UNSPECIFIED",
      "TASK_QUEUE_TYPE_WORKFLOW",
      "TASK_QUEUE_TYPE_ACTIVITY",
      "TASK_QUEUE_TYPE_NEXUS",
    ])
    .optional(),
});
export type WorkerDeploymentVersionInfo_VersionTaskQueueInfoSchema = z.infer<
  typeof WorkerDeploymentVersionInfo_VersionTaskQueueInfoSchema
>;
