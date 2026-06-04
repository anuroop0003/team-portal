import { z } from "zod";

export const correctionSchema = z.object({
  date: z.string().min(1, "Target date is required"),
  origIn: z.string().optional(),
  origOut: z.string().optional(),
  reqIn: z.string().min(1, "Corrected In is required"),
  reqOut: z.string().min(1, "Corrected Out is required"),
  reason: z.string().min(1, "Justification comment is required"),
});

export type CorrectionFormValues = z.infer<typeof correctionSchema>;
