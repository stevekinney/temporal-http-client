import { z } from "zod";

/**Alert contains notification and severity.*/
export const AlertSchema = z
  .object({
    message: z.string().optional(),
    severity: z
      .enum([
        "SEVERITY_UNSPECIFIED",
        "SEVERITY_HIGH",
        "SEVERITY_MEDIUM",
        "SEVERITY_LOW",
      ])
      .optional(),
  })
  .describe("Alert contains notification and severity.");
export type AlertSchema = z.infer<typeof AlertSchema>;
