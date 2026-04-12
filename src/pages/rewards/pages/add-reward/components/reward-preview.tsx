import { cn } from "@/lib/utils";

interface RewardPreviewProps {
  template: number;
  tone: "gold" | "silver" | "bronze";
  awardName?: string;
  year?: string;
  className?: string;
  nameYOffset?: number;
  nameFontSize?: number;
}

const TONES = {
  gold: {
    gradient:
      "linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)",
    text: "text-amber-600 dark:text-amber-200",
  },
  silver: {
    gradient:
      "linear-gradient(135deg, #BDBDBD 0%, #FFFFFF 25%, #9E9E9E 50%, #E0E0E0 75%, #757575 100%)",
    text: "text-slate-600 dark:text-slate-200",
  },
  bronze: {
    gradient:
      "linear-gradient(135deg, #804A00 0%, #D38E2A 25%, #6A3E00 50%, #F5AE5B 75%, #3E2400 100%)",
    text: "text-orange-700 dark:text-orange-200",
  },
};

const TEMPLATE_CONFIGS: Record<
  number,
  {
    nameWidth: string;
    yearPos: string;
    yearBottom?: string;
    defaultYOffset: number;
  }
> = {
  1: {
    nameWidth: "280px",
    yearPos: "absolute",
    yearBottom: "bottom-[30px]",
    defaultYOffset: 60,
  },
  2: {
    nameWidth: "320px",
    yearPos: "absolute",
    yearBottom: "bottom-[70px]",
    defaultYOffset: 80,
  },
  3: {
    nameWidth: "260px",
    yearPos: "absolute",
    yearBottom: "bottom-[40px]",
    defaultYOffset: 40,
  },
};

export function RewardPreview({
  template,
  tone,
  awardName = "REWARD NAME",
  year = "2024",
  className,
  nameYOffset,
  nameFontSize,
}: RewardPreviewProps) {
  const currentTone = TONES[tone];
  const config = TEMPLATE_CONFIGS[template] || TEMPLATE_CONFIGS[1];

  // Use provided offset or template default
  const effectiveYOffset = nameYOffset ?? config.defaultYOffset;

  return (
    <div
      className={cn(
        "relative w-[500px] h-[350px] flex items-center justify-center rounded-xl overflow-hidden border bg-card/30 backdrop-blur-sm shadow-sm",
        className,
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center p-8 transition-all duration-700">
        <div
          className="w-full h-full transition-all duration-700 ease-out"
          style={{
            background: currentTone.gradient,
            WebkitMaskImage: `url(/src/assets/rewards/template-${template}.svg)`,
            maskImage: `url(/src/assets/rewards/template-${template}.svg)`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center text-center">
        <div
          className="transition-all duration-300 flex items-start justify-center"
          style={{
            width: config.nameWidth,
            marginTop: `${effectiveYOffset}px`,
          }}
        >
          <h3
            className={cn(
              "font-lato font-black uppercase tracking-wider leading-normal wrap-break-word whitespace-normal",
              currentTone.text,
            )}
            style={{
              fontSize: `${nameFontSize}px`,
            }}
          >
            {awardName}
          </h3>
        </div>

        <div
          className={cn(
            "flex flex-col items-center transition-all duration-500 absolute left-1/2 -translate-x-1/2",
            config.yearBottom,
          )}
        >
          <div
            className={cn(
              "text-3xl font-black tracking-widest font-lato",
              currentTone.text,
            )}
          >
            {year}
          </div>
        </div>
      </div>
    </div>
  );
}
