import { z } from "zod";

export const PauseActivityResponseSchema = z.object({});
export type PauseActivityResponseSchema = z.infer<
  typeof PauseActivityResponseSchema
>;
