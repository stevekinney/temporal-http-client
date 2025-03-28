import { z } from "zod";

export const ListSchedulesResponseSchema = z.object({
  schedules: z.array(z.any()).optional(),
  nextPageToken: z.string().optional(),
});
export type ListSchedulesResponseSchema = z.infer<
  typeof ListSchedulesResponseSchema
>;
