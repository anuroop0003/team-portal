import { z } from "zod";

export const registerOrganizationSchema = z
  .object({
    fullName: z.string().trim().min(2, "Min. 2 characters"),
    email: z.string().trim().toLowerCase().email("Invalid email"),
    password: z
      .string()
      .min(8, "Min. 8 characters")
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[a-z]/, "Must include at least one lowercase letter")
      .regex(/[0-9]/, "Must include at least one number"),
    confirmPassword: z.string().min(8, "Min. 8 characters"),
    adminPhone: z
      .string()
      .trim()
      .regex(/^[0-9]{10,15}$/, "Invalid phone number"),
    adminJobTitle: z.string().trim().min(2, "Min. 2 characters"),
    companyName: z.string().trim().min(2, "Min. 2 characters"),
    orgCode: z
      .string()
      .trim()
      .min(2, "2-6 characters")
      .max(6, "2-6 characters")
      .regex(/^[A-Z0-9]+$/, "Only uppercase letters & numbers"),
    orgWebsite: z
      .string()
      .trim()
      .refine((val) => !val || /^https?:\/\/.+/.test(val), {
        message: "Invalid URL",
      })
      .optional(),
    orgIndustry: z.string().min(1, "Select industry"),
    orgCompanySize: z.string().min(1, "Select size"),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "Terms required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords mismatch",
    path: ["confirmPassword"],
  });

export type RegisterOrganizationFormValues = z.infer<
  typeof registerOrganizationSchema
>;
