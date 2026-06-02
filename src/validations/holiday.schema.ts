import { z } from "zod";

export const holidaySchema = z.object({
  name: z.string().min(1, "Holiday title is required"),
  date: z.string().min(1, "Date is required"),
  type: z.enum(["public", "restricted", "company-specific"], {
    required_error: "Holiday category is required",
  }),
  locationScope: z.string().min(1, "Location scope is required"),
  isPaid: z.boolean().default(true),
});

export type HolidayFormValues = z.infer<typeof holidaySchema>;
