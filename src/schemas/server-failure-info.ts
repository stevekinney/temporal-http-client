import { z } from "zod";

export const ServerFailureInfoSchema = z.object({
  nonRetryable: z.boolean().optional(),
});
export type ServerFailureInfoSchema = z.infer<typeof ServerFailureInfoSchema>;
