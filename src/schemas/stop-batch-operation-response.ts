import { z } from "zod";

export const StopBatchOperationResponseSchema = z.object({});
export type StopBatchOperationResponseSchema = z.infer<
  typeof StopBatchOperationResponseSchema
>;
