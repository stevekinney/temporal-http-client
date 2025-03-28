import { z } from "zod";

export const ListScheduleMatchingTimesResponseSchema = z.object({
  startTime: z.array(z.string().datetime({ offset: true })).optional(),
});
export type ListScheduleMatchingTimesResponseSchema = z.infer<
  typeof ListScheduleMatchingTimesResponseSchema
>;
