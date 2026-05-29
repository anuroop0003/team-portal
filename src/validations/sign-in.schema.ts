import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Enter a valid email address"),

  password: z.string().min(8, "Use at least 8 characters"),

  remember: z.boolean().optional(),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
