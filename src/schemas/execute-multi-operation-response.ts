import { z } from "zod";

export const ExecuteMultiOperationResponseSchema = z.object({
  responses: z.array(z.any()).optional(),
});
export type ExecuteMultiOperationResponseSchema = z.infer<
  typeof ExecuteMultiOperationResponseSchema
>;
