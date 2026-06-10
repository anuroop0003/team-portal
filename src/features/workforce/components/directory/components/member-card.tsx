import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getStatusVariant } from "@/features/workforce";
import { type Member } from "@/features/workforce/types/workforce";
import { Skeleton } from "@/components/ui/skeleton";

interface MemberCardProps {
  member: Member;
  isLoading: boolean;
}

export function MemberCard({ member, isLoading }: MemberCardProps) {
  if (isLoading) return <MemberCardSkeleton />;

  return (
    <Card className="rounded-lg">
      <CardHeader className="gap-0">
        <CardTitle className="line-clamp-1">{member.name}</CardTitle>
        <CardDescription className="text-xs">{member.position}</CardDescription>
        <Badge variant={getStatusVariant(member.status)} className="mt-2">
          {member.status}
        </Badge>
        <CardAction>
          <Avatar className="size-10">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Mail className="size-4" />
          <span className="truncate">{member.email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="size-4" />
          <span>Joined {new Date(member.joinedDate).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function MemberCardSkeleton() {
  return (
    <Card className="rounded-lg">
      <CardHeader className="gap-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="size-10 rounded-full" />
        </div>

        <Skeleton className="h-5 w-20 mt-2" />
      </CardHeader>

      <CardContent className="space-y-3">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-3 w-32" />
      </CardContent>
    </Card>
  );
}
