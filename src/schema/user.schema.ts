import { z } from "zod";

export const nameSchema = z
  .string()
  .min(3)
  .max(8)
  .regex(/^[a-zA-Z0-9_]+$/, "name must not contain any special Charactors");
