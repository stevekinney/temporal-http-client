import { z } from "zod";

/**
 * BatchOperationDeletion sends deletion requests to batch workflows.
 *  Keep the parameter in sync with temporal.api.workflowservice.v1.DeleteWorkflowExecutionRequest.
 */
export const BatchOperationDeletionSchema = z
  .object({
    /**The identity of the worker/client*/
    identity: z
      .string()
      .describe("The identity of the worker/client")
      .optional(),
  })
  .describe(
    "BatchOperationDeletion sends deletion requests to batch workflows.\n Keep the parameter in sync with temporal.api.workflowservice.v1.DeleteWorkflowExecutionRequest.",
  );
export type BatchOperationDeletionSchema = z.infer<
  typeof BatchOperationDeletionSchema
>;
