import { z } from "zod";

/**
 * Represents some binary (byte array) data (ex: activity input parameters or workflow result) with
 *  metadata which describes this binary data (format, encoding, encryption, etc). Serialization
 *  of the data may be user-defined.
 */
export const PayloadSchema = z
  .any()
  .describe(
    "Represents some binary (byte array) data (ex: activity input parameters or workflow result) with\n metadata which describes this binary data (format, encoding, encryption, etc). Serialization\n of the data may be user-defined.",
  );
export type PayloadSchema = z.infer<typeof PayloadSchema>;
