import { z } from "zod";

export const TimestampedBuildIdAssignmentRuleSchema = z.object({
  rule: z.any().optional(),
  createTime: z.string().datetime({ offset: true }).optional(),
});
export type TimestampedBuildIdAssignmentRuleSchema = z.infer<
  typeof TimestampedBuildIdAssignmentRuleSchema
>;
