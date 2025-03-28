import { z } from "zod";

export const UpdateActivityOptionsResponseSchema = z.object({
  /**Activity options after an update*/
  activityOptions: z
    .any()
    .describe("Activity options after an update")
    .optional(),
});
export type UpdateActivityOptionsResponseSchema = z.infer<
  typeof UpdateActivityOptionsResponseSchema
>;
