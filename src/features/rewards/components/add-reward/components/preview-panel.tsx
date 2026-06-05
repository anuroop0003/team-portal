import { useFormContext, useWatch } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { RewardPreview } from "./reward-preview";
import { type RewardFormValues } from "@/features/rewards/validations/reward.schema";

export function PreviewPanel() {
  const { control } = useFormContext<RewardFormValues>();
  const formValues = useWatch({ control });

  return (
    <Card className="lg:col-span-8 min-h-[500px] lg:sticky lg:top-20 lg:self-start">
      <CardContent className="flex-1 flex items-center justify-center p-12">
        <div className="w-full max-w-2xl transform scale-110 md:scale-125 transition-transform duration-500">
          <div className="flex justify-center items-center">
            <RewardPreview
              template={formValues.template ?? 1}
              tone={formValues.tone ?? "gold"}
              awardName={formValues.awardName}
              year={formValues.year}
              nameYOffset={formValues.nameYOffset}
              nameFontSize={formValues.nameFontSize}
              className="shadow-2xl shadow-black/40"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
