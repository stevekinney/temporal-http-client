import { z } from "zod";

export const TaskQueueTypeInfoSchema = z.object({
  /**Unversioned workers (with `useVersioning=false`) are reported in unversioned result even if they set a Build ID.*/
  pollers: z
    .array(z.any())
    .describe(
      "Unversioned workers (with `useVersioning=false`) are reported in unversioned result even if they set a Build ID.",
    )
    .optional(),
  stats: z.any().optional(),
});
export type TaskQueueTypeInfoSchema = z.infer<typeof TaskQueueTypeInfoSchema>;
