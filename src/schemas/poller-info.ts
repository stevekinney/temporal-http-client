import { z } from "zod";

export const PollerInfoSchema = z.object({
  lastAccessTime: z.string().datetime({ offset: true }).optional(),
  identity: z.string().optional(),
  ratePerSecond: z.number().optional(),
  /**
   * If a worker has opted into the worker versioning feature while polling, its capabilities will
   *  appear here.
   *  Deprecated. Replaced by deployment_options.
   */
  workerVersionCapabilities: z
    .any()
    .describe(
      "If a worker has opted into the worker versioning feature while polling, its capabilities will\n appear here.\n Deprecated. Replaced by deployment_options.",
    )
    .optional(),
  /**Worker deployment options that SDK sent to server.*/
  deploymentOptions: z
    .any()
    .describe("Worker deployment options that SDK sent to server.")
    .optional(),
});
export type PollerInfoSchema = z.infer<typeof PollerInfoSchema>;
