import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  status: z.enum(["Todo", "In Progress", "In Review", "Done"]),
  priority: z.enum(["Low", "Medium", "High", "Critical"]),
  assigneeId: z.string().optional(),
  dueDate: z.string().min(1, "Due date is required"),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
