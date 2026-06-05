import { cn } from "@/lib/utils";
import type { HistoryItem } from "../../constants";
import { Card, CardContent } from "@/components/ui/card";

interface RecentHistoryProps {
  items: HistoryItem[];
}

export function RecentHistory({ items }: RecentHistoryProps) {
  return (
    <Card>
      <CardContent className="px-0 pt-2 relative">
        <div className="space-y-1">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <h1 className="text-sm font-bold line-clamp-1">
                      {item.reason}
                    </h1>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">
                    {item.date}
                  </p>
                </div>
                <div
                  className={cn(
                    "text-sm font-bold font-mono",
                    item.amount > 0 ? "text-emerald-500" : "text-destructive",
                  )}
                >
                  {item.amount > 0 ? "+" : ""}
                  {item.amount.toLocaleString()}
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-sm text-muted-foreground">
              No recent history found.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
