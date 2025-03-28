import { z } from "zod";

export const ScheduleSchema = z.object({
  spec: z.any().optional(),
  action: z.any().optional(),
  policies: z.any().optional(),
  state: z.any().optional(),
});
export type ScheduleSchema = z.infer<typeof ScheduleSchema>;
