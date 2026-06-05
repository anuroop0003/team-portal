import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RewardHeader } from "./components/reward-header";
import { StyleConfigCard } from "./components/style-config-card";
import { ContentConfigCard } from "./components/content-config-card";
import { LayoutConfigCard } from "./components/layout-config-card";
import { PreviewPanel } from "./components/preview-panel";
import {
  rewardSchema,
  type RewardFormValues,
} from "@/features/rewards/validations/reward.schema";

export default function AddRewardPage() {
  const methods = useForm<RewardFormValues>({
    resolver: zodResolver(rewardSchema),
    defaultValues: {
      template: 1,
      tone: "gold",
      awardName: "STAR PERFORMER",
      year: new Date().getFullYear().toString(),
      nameYOffset: 60,
      nameFontSize: 36,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: RewardFormValues) => {
    console.log("Submitting Reward:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert("Reward assigned successfully!");
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <RewardHeader
          isSubmitting={isSubmitting}
          onAssign={handleSubmit(onSubmit)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-6">
            <StyleConfigCard />
            <LayoutConfigCard />
            <ContentConfigCard />
          </div>

          <PreviewPanel />
        </div>
      </div>
    </FormProvider>
  );
}
