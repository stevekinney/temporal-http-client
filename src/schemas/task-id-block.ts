import { z } from "zod";

export const TaskIdBlockSchema = z.object({
  startId: z.string().optional(),
  endId: z.string().optional(),
});
export type TaskIdBlockSchema = z.infer<typeof TaskIdBlockSchema>;
