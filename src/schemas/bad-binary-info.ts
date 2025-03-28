import { z } from "zod";

export const BadBinaryInfoSchema = z.object({
  reason: z.string().optional(),
  operator: z.string().optional(),
  createTime: z.string().datetime({ offset: true }).optional(),
});
export type BadBinaryInfoSchema = z.infer<typeof BadBinaryInfoSchema>;
