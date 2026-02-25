import { z } from "zod";

export const deleteAccountSchema = z.object({
  confirmation: z
    .string()
    .min(1, "Please type 'delete my account' to confirm")
    .refine(
      (value) => value.toLowerCase() === "delete my account",
      "You must type 'delete my account' exactly to confirm"
    ),
});

export type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>;
