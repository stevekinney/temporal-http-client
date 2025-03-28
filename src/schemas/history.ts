import { z } from "zod";

export const HistorySchema = z.object({ events: z.array(z.any()).optional() });
export type HistorySchema = z.infer<typeof HistorySchema>;
