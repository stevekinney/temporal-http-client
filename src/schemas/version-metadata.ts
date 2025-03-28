import { z } from "zod";

export const VersionMetadataSchema = z.object({
  /**Arbitrary key-values.*/
  entries: z.record(z.any()).describe("Arbitrary key-values.").optional(),
});
export type VersionMetadataSchema = z.infer<typeof VersionMetadataSchema>;
