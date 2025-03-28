import { z } from "zod";

export const ExecuteMultiOperationResponse_ResponseSchema = z.object({
  startWorkflow: z.any().optional(),
  updateWorkflow: z.any().optional(),
});
export type ExecuteMultiOperationResponse_ResponseSchema = z.infer<
  typeof ExecuteMultiOperationResponse_ResponseSchema
>;
