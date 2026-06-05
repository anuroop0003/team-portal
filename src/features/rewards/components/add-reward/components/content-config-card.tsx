import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type RewardFormValues } from "@/features/rewards/validations/reward.schema";

export function ContentConfigCard() {
  const {
    register,
    formState: { errors },
  } = useFormContext<RewardFormValues>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Details</CardTitle>
        <CardDescription>The text that appears on the card.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field>
          <FieldLabel htmlFor="awardName">Award Name</FieldLabel>
          <FieldContent>
            <Input
              id="awardName"
              {...register("awardName")}
              placeholder="e.g. Employee of the Month"
            />
            <FieldError errors={[errors.awardName]} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="year">Year</FieldLabel>
          <FieldContent>
            <Input id="year" {...register("year")} placeholder="2024" />
            <FieldError errors={[errors.year]} />
          </FieldContent>
        </Field>
      </CardContent>
    </Card>
  );
}
