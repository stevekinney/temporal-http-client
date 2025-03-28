import { z } from "zod";

export const GetWorkflowExecutionHistoryReverseResponseSchema = z.object({
  history: z.any().optional(),
  /**Will be set if there are more history events than were included in this response*/
  nextPageToken: z
    .string()
    .describe(
      "Will be set if there are more history events than were included in this response",
    )
    .optional(),
});
export type GetWorkflowExecutionHistoryReverseResponseSchema = z.infer<
  typeof GetWorkflowExecutionHistoryReverseResponseSchema
>;
