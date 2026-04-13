import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Reward } from "../constants";
import { Medal } from "lucide-react";

interface RewardCardProps {
  reward: Reward;
}

export function RewardCard({ reward }: RewardCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium line-clamp-1">
          {reward.title}
        </CardTitle>
        <CardAction className="size-8 rounded-lg flex items-center justify-center shadow-sm border bg-amber-500/10">
          <Medal className="text-amber-500 size-5" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-2xl font-bold tracking-tighter text-amber-500">
            {reward.points.toLocaleString()}
          </span>
          <span className="text-[10px] font-bold text-muted-foreground tracking-widest">
            pts
          </span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {reward.description}
        </p>
      </CardContent>
    </Card>
  );
}
