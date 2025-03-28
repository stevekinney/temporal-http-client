import { z } from "zod";

export const CreateScheduleResponseSchema = z.object({
  conflictToken: z.string().optional(),
});
export type CreateScheduleResponseSchema = z.infer<
  typeof CreateScheduleResponseSchema
>;
