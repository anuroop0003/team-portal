import { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Calendar, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EditMemberModal } from "./edit-member-modal";

interface MemberCardProps {
  member: {
    id: string;
    name: string;
    role: string;
    position: string;
    email: string;
    avatar: string;
    status: string;
    joinedDate: string;
    points: number;
  };
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case "In Office":
      return "success";
    case "WFH":
      return "indigo";
    case "On Leave":
      return "destructive";
    default:
      return "secondary";
  }
};

export function MemberCard({ member }: MemberCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  return (
    <>
      <Card className="rounded-lg">
        <CardHeader className="gap-0">
          <CardTitle className="line-clamp-1">
            {member.name}
            <Button
              variant="ghost"
              size="icon-xs"
              className="ml-2 cursor-pointer text-primary hover:text-primary"
              onClick={() => setIsEditModalOpen(true)}
            >
              <SquarePen />
            </Button>
          </CardTitle>
          <CardDescription className="text-xs">
            {member.position}
          </CardDescription>
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
            <span>
              Joined {new Date(member.joinedDate).toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Card>

      <EditMemberModal
        member={member}
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
      />
    </>
  );
}
