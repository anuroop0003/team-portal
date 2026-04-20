import { z } from "zod";

export const rewardSchema = z.object({
  template: z.number().min(1).max(3),

  tone: z.enum(["gold", "silver", "bronze"]),

  awardName: z
    .string()
    .min(1, "Enter an award name")
    .max(40, "Use 40 characters or fewer"),

  year: z
    .string()
    .length(4, "Enter a 4-digit year")
    .regex(/^\d{4}$/, "Enter a valid year"),

  nameYOffset: z.number(),

  nameFontSize: z.number().min(12, "Use 12–100").max(100, "Use 12–100"),
});

export type RewardFormValues = z.infer<typeof rewardSchema>;
