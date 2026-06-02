import { Crown, ChevronsUp, ChevronsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MOCK_LEADERBOARD } from "../../constants";

export function CompactLeaderboard() {
  return (
    <div className="space-y-2">
      {MOCK_LEADERBOARD.map((person) => (
        <div
          key={person.id}
          className={cn(
            "flex items-center justify-between p-3 rounded-xl transition-all duration-300",
            "bg-card border shadow-sm hover:border-primary/20",
            person.isUser && "bg-primary/5 border-primary/20",
          )}
        >
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center size-8 shrink-0">
              {person.rank === 1 ? (
                <Crown className="size-5 text-yellow-400 fill-yellow-400" />
              ) : person.rank === 2 ? (
                <Crown className="size-5 text-gray-300 fill-gray-300" />
              ) : person.rank === 3 ? (
                <Crown className="size-5 text-amber-600 fill-amber-600" />
              ) : (
                <div className="size-5 flex items-center justify-center text-xs text-foreground">
                  {person.rank}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar className="size-8 border shrink-0">
                <AvatarImage src={person.avatar} alt={person.name} />
                <AvatarFallback className="bg-muted text-[10px] font-bold">
                  {person.avatar}
                </AvatarFallback>
              </Avatar>

              <p
                className={cn(
                  "text-xs font-bold truncate",
                  person.isUser ? "text-primary" : "text-foreground",
                )}
              >
                {person.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <div className="text-xs font-bold tabular-nums">
                {person.points.toLocaleString()}
                <span className="text-[9px] text-muted-foreground ml-1 font-medium">
                  pts
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center w-4">
              {person.change === "up" ? (
                <ChevronsUp className="size-4 text-emerald-500" />
              ) : person.change === "down" ? (
                <ChevronsDown className="size-4 text-rose-500" />
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
