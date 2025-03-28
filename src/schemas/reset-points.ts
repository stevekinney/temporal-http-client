import { z } from "zod";

export const ResetPointsSchema = z.object({
  points: z.array(z.any()).optional(),
});
export type ResetPointsSchema = z.infer<typeof ResetPointsSchema>;
