import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  orgInitial: z
    .string()
    .min(2, "Initial must be 2-6 characters")
    .max(6, "Initial must be 2-6 characters"),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
