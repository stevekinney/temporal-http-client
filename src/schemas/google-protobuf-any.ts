import { z } from "zod";

/**Contains an arbitrary serialized message along with a @type that describes the type of the serialized message.*/
export const GoogleProtobufAnySchema = z
  .object({
    /**The type of the serialized message.*/
    "@type": z
      .string()
      .describe("The type of the serialized message.")
      .optional(),
  })
  .catchall(z.any())
  .describe(
    "Contains an arbitrary serialized message along with a @type that describes the type of the serialized message.",
  );
export type GoogleProtobufAnySchema = z.infer<typeof GoogleProtobufAnySchema>;
