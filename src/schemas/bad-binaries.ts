import { z } from "zod";

export const BadBinariesSchema = z.object({
  binaries: z.record(z.any()).optional(),
});
export type BadBinariesSchema = z.infer<typeof BadBinariesSchema>;
