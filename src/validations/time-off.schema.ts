import { z } from "zod";

export const timeOffSchema = z
  .object({
    leaveTypeId: z.string().min(1, "Please select a leave category"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    halfDay: z.boolean().default(false),
    halfDaySession: z.enum(["morning", "afternoon"]).optional(),
    reason: z.string().min(1, "Reason for absence is required"),
  })
  .refine(
    (data) => {
      if (!data.halfDay && !data.endDate) {
        return false;
      }
      return true;
    },
    {
      message: "End date is required for multi-day requests",
      path: ["endDate"],
    },
  )
  .refine(
    (data) => {
      if (data.halfDay && !data.halfDaySession) {
        return false;
      }
      return true;
    },
    {
      message: "Please select a session (First Half or Second Half)",
      path: ["halfDaySession"],
    },
  );

export type TimeOffFormValues = z.infer<typeof timeOffSchema>;
