import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { EditMemberModal } from "./edit-member/edit-member-modal";
import { DeleteMemberDialog } from "./edit-member/delete-member-dialog";
import { getRoleVariant, getStatusVariant } from "@/features/workforce";
import { type Member } from "@/features/workforce/types/workforce";

interface UserTableProps {
  members: Member[];
}

export function UserTable({ members }: UserTableProps) {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEditClick = (member: Member) => {
    setSelectedMember(member);
    setIsEditOpen(true);
  };

  const handleDeleteClick = (member: Member) => {
    setSelectedMember(member);
    setIsDeleteOpen(true);
  };

  if (members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-lg border border-dashed bg-card/50">
        <p className="text-sm text-muted-foreground font-medium">
          No team members matched your search.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-background hover:bg-background">
              <TableHead className="h-12 px-4">User</TableHead>
              <TableHead className="h-12 px-4">Position</TableHead>
              <TableHead className="h-12 px-4">System Role</TableHead>
              <TableHead className="h-12 px-4">Status</TableHead>
              <TableHead className="h-12 px-4">Joined Date</TableHead>
              <TableHead className="w-[100px] text-right h-12 px-4">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
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
                      onClick={() => handleEditClick(member)}
                    >
                      <Edit />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="cursor-pointer text-destructive/80 hover:text-destructive"
                      onClick={() => handleDeleteClick(member)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedMember && (
        <>
          <EditMemberModal
            member={selectedMember}
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
          />
          <DeleteMemberDialog
            member={selectedMember}
            open={isDeleteOpen}
            onOpenChange={setIsDeleteOpen}
          />
        </>
      )}
    </>
  );
}
