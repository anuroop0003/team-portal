import { z } from "zod";

export const addMemberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  role: z
    .object({
      label: z.string(),
      value: z.enum(["user", "manager", "admin"]),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "Please select an access role",
    }),
});

export type AddMemberValues = z.infer<typeof addMemberSchema>;
