import { useFormContext, useWatch } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel, FieldContent } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type RewardFormValues } from "@/validations/reward.schema";

export function StyleConfigCard() {
  const { setValue, control } = useFormContext<RewardFormValues>();
  const template = useWatch({ name: "template", control });
  const tone = useWatch({ name: "tone", control });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Style & Tone</CardTitle>
        <CardDescription>Select a layout and metallic finish.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Field>
          <FieldLabel>Wreath Style</FieldLabel>
          <FieldContent>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((t) => (
                <Button
                  key={t}
                  type="button"
                  variant="outline"
                  onClick={() => setValue("template", t)}
                  className={cn(
                    "cursor-pointer relative h-auto aspect-square border-2 transition-all flex items-center justify-center overflow-hidden group",
                    template === t
                      ? "border-primary bg-primary/5"
                      : "border-border bg-muted/20",
                  )}
                >
                  <img
                    src={`/src/assets/rewards/template-${t}.svg`}
                    alt={`Template ${t}`}
                    className={cn(
                      "w-full h-full opacity-60 group-hover:opacity-100 transition-opacity",
                      template === t && "opacity-100",
                    )}
                  />
                </Button>
              ))}
            </div>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>Metal Finish</FieldLabel>
          <FieldContent>
            <div className="flex gap-2">
              {(["gold", "silver", "bronze"] as const).map((t) => (
                <Button
                  key={t}
                  type="button"
                  variant="outline"
                  onClick={() => setValue("tone", t)}
                  className={cn(
                    "cursor-pointer flex-1 border-2 capitalize",
                    tone === t
                      ? "border-primary bg-primary/5"
                      : "border-border",
                  )}
                >
                  {t}
                </Button>
              ))}
            </div>
          </FieldContent>
        </Field>
      </CardContent>
    </Card>
  );
}
