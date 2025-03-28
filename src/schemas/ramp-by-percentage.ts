import { z } from "zod";

export const RampByPercentageSchema = z.object({
  /**Acceptable range is [0,100).*/
  rampPercentage: z
    .number()
    .describe("Acceptable range is [0,100).")
    .optional(),
});
export type RampByPercentageSchema = z.infer<typeof RampByPercentageSchema>;
