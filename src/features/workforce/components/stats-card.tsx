import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface StatsCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  description: string;
  isLoading?: boolean;
}

export function StatsCard({
  label,
  value,
  icon,
  description,
  isLoading = false,
}: StatsCardProps) {
  if (isLoading) return <StatsCardSkeleton />;

  return (
    <Card className="rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

function StatsCardSkeleton() {
  return (
    <Card className="rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="size-6 rounded-md" />
      </CardHeader>

      <CardContent>
        <Skeleton className="h-8 w-20 mb-2" />
        <Skeleton className="h-3 w-1/2" />
      </CardContent>
    </Card>
  );
}
