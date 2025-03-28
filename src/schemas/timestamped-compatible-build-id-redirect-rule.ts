import { z } from "zod";

export const TimestampedCompatibleBuildIdRedirectRuleSchema = z.object({
  rule: z.any().optional(),
  createTime: z.string().datetime({ offset: true }).optional(),
});
export type TimestampedCompatibleBuildIdRedirectRuleSchema = z.infer<
  typeof TimestampedCompatibleBuildIdRedirectRuleSchema
>;
