import { useFormContext, useWatch } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel, FieldContent } from "@/components/ui/field";
import { type RewardFormValues } from "@/validations/reward.schema";

export function LayoutConfigCard() {
  const { setValue, control } = useFormContext<RewardFormValues>();
  const nameFontSize = useWatch({ name: "nameFontSize", control });
  const nameYOffset = useWatch({ name: "nameYOffset", control });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Layout Adjustments</CardTitle>
        <CardDescription>
          Fine-tune the Award Name position and size.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Field>
          <div className="flex justify-between items-center mb-2">
            <FieldLabel>Font Size ({nameFontSize}px)</FieldLabel>
          </div>
          <FieldContent>
            <input
              type="range"
              min="12"
              max="100"
              step="1"
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              value={nameFontSize}
              onChange={(e) =>
                setValue("nameFontSize", parseInt(e.target.value))
              }
            />
          </FieldContent>
        </Field>

        <Field>
          <div className="flex justify-between items-center mb-2">
            <FieldLabel>Vertical Offset ({nameYOffset}px)</FieldLabel>
          </div>
          <FieldContent>
            <input
              type="range"
              min="0"
              max="150"
              step="1"
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              value={nameYOffset}
              onChange={(e) =>
                setValue("nameYOffset", parseInt(e.target.value))
              }
            />
          </FieldContent>
        </Field>
      </CardContent>
    </Card>
  );
}
