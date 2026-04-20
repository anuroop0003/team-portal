import { z } from "zod";

export const addMemberSchema = z.object({
  name: z.string().min(2, "Enter a valid name"),
  email: z.string().email("Enter a valid email address"),
  position: z.string().min(2, "Enter a valid position"),
  role: z.object(
    {
      label: z.string(),
      value: z.enum(["user", "manager", "admin"]),
    },
    {
      error: "Select an access role",
    },
  ),
});

export type AddMemberFormValues = z.infer<typeof addMemberSchema>;
