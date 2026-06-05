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

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
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
