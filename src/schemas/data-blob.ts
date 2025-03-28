import { z } from "zod";

export const DataBlobSchema = z.object({
  encodingType: z
    .enum([
      "ENCODING_TYPE_UNSPECIFIED",
      "ENCODING_TYPE_PROTO3",
      "ENCODING_TYPE_JSON",
    ])
    .optional(),
  data: z.string().optional(),
});
export type DataBlobSchema = z.infer<typeof DataBlobSchema>;
