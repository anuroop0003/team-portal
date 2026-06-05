import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { getRoleVariant, getStatusVariant } from "@/features/workforce";
import { type Member } from "@/features/workforce/types/workforce";

interface UserTableBodyProps {
  members: Member[];
  onEditClick: (member: Member) => void;
  onDeleteClick: (member: Member) => void;
}

export function UserTableBody({
  members,
  onEditClick,
  onDeleteClick,
}: UserTableBodyProps) {
  return (
    <TableBody>
      {members.map((member) => (
        <TableRow key={member.id}>
          <TableCell className="py-3 px-4">
            <div className="flex items-center gap-3">
              <Avatar className="size-9 border border-border/40">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="font-semibold text-sm tracking-tight text-foreground truncate max-w-[180px]">
                  {member.name}
                </span>
                <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                  {member.email}
                </span>
              </div>
            </div>
          </TableCell>
          <TableCell className="py-3 px-4">{member.position}</TableCell>
          <TableCell className="py-3 px-4">
            <Badge
              variant={getRoleVariant(member.role)}
              className="font-medium"
            >
              {member.role}
            </Badge>
          </TableCell>
          <TableCell className="py-3 px-4">
            <Badge variant={getStatusVariant(member.status)}>
              {member.status}
            </Badge>
          </TableCell>
          <TableCell className="py-3 px-4">
            {new Date(member.joinedDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </TableCell>
          <TableCell className="py-3 px-4 text-right">
            <div className="flex items-center justify-end gap-1.5">
              <Button
                variant="ghost"
                size="icon-sm"
                className="cursor-pointer text-muted-foreground hover:text-foreground"
                onClick={() => onEditClick(member)}
              >
                <Edit />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                className="cursor-pointer text-destructive/80 hover:text-destructive"
                onClick={() => onDeleteClick(member)}
              >
                <Trash2 />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
