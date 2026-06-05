import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StatsCardProps {
  title: React.ReactNode;
  description: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function StatsCard({
  title,
  description,
  action,
  className,
}: StatsCardProps) {
  return (
    <Card size="sm" className={className}>
      <CardHeader className="gap-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
        {action && <CardAction className="self-center">{action}</CardAction>}
      </CardHeader>
    </Card>
  );
}
