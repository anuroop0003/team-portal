import { Link } from "react-router-dom";
import { ArrowLeft, Save, Send } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { PATHS } from "@/routes/constants/paths";

interface RewardHeaderProps {
  isSubmitting: boolean;
  onAssign: () => void;
}

export function RewardHeader({ isSubmitting, onAssign }: RewardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link
          to={PATHS.REWARDS.ROOT}
          className={buttonVariants({
            size: "icon",
            className: "rounded-full! cursor-pointer",
          })}
        >
          <ArrowLeft />
        </Link>
        <h2 className="text-lg font-bold tracking-tight">Assign New Reward</h2>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" type="button" className="cursor-pointer">
          <Save /> Save as Template
        </Button>
        <Button
          onClick={onAssign}
          disabled={isSubmitting}
          className="cursor-pointer min-w-32"
        >
          <Send />
          Assign Reward
        </Button>
      </div>
    </div>
  );
}
