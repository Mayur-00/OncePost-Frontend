import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(8)
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "UserName must not contain any special Charactors"
    ),
  email: z.email({ message: "Invalid Email Address" }),
  password: z
    .string()
    .min(6, "password must be atleast 6 characters long")
    .max(15, "Password Must Not Longer Than 15 Characters"),
});
export type registerUserData = z.infer<typeof registerSchema>
export const loginSchema = z.object({
  email: z.email({ message: "Invalid Email Address" }),
  password: z
  .string()
  .min(6, "password must be atleast 6 characters long")
  .max(15, "Password Must Not Longer Than 15 Characters"),
});

export type loginUserData = z.infer<typeof loginSchema>

