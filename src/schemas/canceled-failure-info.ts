import { z } from "zod";

export const CanceledFailureInfoSchema = z.object({
  details: z.any().optional(),
});
export type CanceledFailureInfoSchema = z.infer<
  typeof CanceledFailureInfoSchema
>;
