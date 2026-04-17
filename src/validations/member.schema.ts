import { z } from "zod";

export const addMemberSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  position: z.string().min(2),
  role: z.object(
    {
      label: z.string(),
      value: z.enum(["user", "manager", "admin"]),
    },
    {
      error: "Please select an access role",
    },
  ),
});

export type AddMemberFormValues = z.infer<typeof addMemberSchema>;
