import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Reward } from "../constants";
import { Ticket } from "lucide-react";

interface TicketCardProps {
  reward: Reward;
}

export function TicketCard({ reward }: TicketCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium line-clamp-1">
          {reward.title}
        </CardTitle>
        <CardAction className="size-8 rounded-lg flex items-center justify-center shadow-sm border bg-teal-500/10">
          <Ticket className="text-teal-500 size-5" />
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-2xl font-bold tracking-tighter text-teal-500">
            {reward.points.toLocaleString()}
          </span>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            pts
          </span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {reward.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          size="sm"
          className="ml-auto text-secondary bg-teal-500 hover:bg-teal-500/80 cursor-pointer"
        >
          Redeem Now
        </Button>
      </CardFooter>
    </Card>
  );
}
