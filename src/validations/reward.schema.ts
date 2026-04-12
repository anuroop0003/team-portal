import { z } from "zod";

export const rewardSchema = z.object({
  template: z.number().min(1).max(3),
  tone: z.enum(["gold", "silver", "bronze"]),
  awardName: z
    .string()
    .min(1, "Award name is required")
    .max(40, "Name is too long"),
  year: z.string().length(4, "Year must be exactly 4 digits"),
  nameYOffset: z.number(),
  nameFontSize: z.number().min(12).max(100),
});

export type RewardFormValues = z.infer<typeof rewardSchema>;
