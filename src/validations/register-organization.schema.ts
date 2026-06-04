import { z } from "zod";

export const registerOrganizationSchema = z
  .object({
    organizationName: z
      .string()
      .trim()
      .min(2, "Enter a valid organization name"),

    companyCode: z
      .string()
      .trim()
      .min(2, "Use 2–6 characters")
      .max(6, "Use 2–6 characters")
      .regex(/^[A-Z0-9]+$/, "Use uppercase letters and numbers only"),

    userName: z.string().trim().min(2, "Enter a valid name"),

    userEmail: z
      .string()
      .trim()
      .toLowerCase()
      .email("Enter a valid email address"),

    password: z
      .string()
      .min(8, "Use at least 8 characters")
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[a-z]/, "Include at least one lowercase letter")
      .regex(/[0-9]/, "Include at least one number"),

    confirmPassword: z.string().min(8, "Use at least 8 characters"),
    logo: z
      .file()
      .max(2 * 1024 * 1024, {
        message: "Logo must be smaller than 2 MB.",
      })
      .mime(["image/jpeg", "image/png", "image/webp"], {
        message: "Only JPG, PNG, and WEBP images are allowed.",
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterOrganizationFormValues = z.infer<
  typeof registerOrganizationSchema
>;
