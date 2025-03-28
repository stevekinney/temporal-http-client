import { z } from "zod";

export const ExternalWorkflowExecutionCancelRequestedEventAttributesSchema =
  z.object({
    /**
     * id of the `REQUEST_CANCEL_EXTERNAL_WORKFLOW_EXECUTION_INITIATED` event this event corresponds
     *  to
     */
    initiatedEventId: z
      .string()
      .describe(
        "id of the `REQUEST_CANCEL_EXTERNAL_WORKFLOW_EXECUTION_INITIATED` event this event corresponds\n to",
      )
      .optional(),
    /**
     * Namespace of the to-be-cancelled workflow.
     *  SDKs and UI tools should use `namespace` field but server must use `namespace_id` only.
     */
    namespace: z
      .string()
      .describe(
        "Namespace of the to-be-cancelled workflow.\n SDKs and UI tools should use `namespace` field but server must use `namespace_id` only.",
      )
      .optional(),
    namespaceId: z.string().optional(),
    workflowExecution: z.any().optional(),
  });
export type ExternalWorkflowExecutionCancelRequestedEventAttributesSchema =
  z.infer<typeof ExternalWorkflowExecutionCancelRequestedEventAttributesSchema>;
