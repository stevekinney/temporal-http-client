import { z } from "zod";

export const WorkflowExecutionConfigSchema = z.object({
  taskQueue: z.any().optional(),
  workflowExecutionTimeout: z
    .string()
    .regex(new RegExp("^-?(?:0|[1-9][0-9]{0,11})(?:\\.[0-9]{1,9})?s$"))
    .optional(),
  workflowRunTimeout: z
    .string()
    .regex(new RegExp("^-?(?:0|[1-9][0-9]{0,11})(?:\\.[0-9]{1,9})?s$"))
    .optional(),
  defaultWorkflowTaskTimeout: z
    .string()
    .regex(new RegExp("^-?(?:0|[1-9][0-9]{0,11})(?:\\.[0-9]{1,9})?s$"))
    .optional(),
  /**User metadata provided on start workflow.*/
  userMetadata: z
    .any()
    .describe("User metadata provided on start workflow.")
    .optional(),
});
export type WorkflowExecutionConfigSchema = z.infer<
  typeof WorkflowExecutionConfigSchema
>;
