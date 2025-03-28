import { z } from "zod";

export const CountWorkflowExecutionsResponse_AggregationGroupSchema = z.object({
  groupValues: z.array(z.any()).optional(),
  count: z.string().optional(),
});
export type CountWorkflowExecutionsResponse_AggregationGroupSchema = z.infer<
  typeof CountWorkflowExecutionsResponse_AggregationGroupSchema
>;
