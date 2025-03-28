import { z } from "zod";

export const ListBatchOperationsResponseSchema = z.object({
  /**BatchOperationInfo contains the basic info about batch operation*/
  operationInfo: z
    .array(z.any())
    .describe(
      "BatchOperationInfo contains the basic info about batch operation",
    )
    .optional(),
  nextPageToken: z.string().optional(),
});
export type ListBatchOperationsResponseSchema = z.infer<
  typeof ListBatchOperationsResponseSchema
>;
