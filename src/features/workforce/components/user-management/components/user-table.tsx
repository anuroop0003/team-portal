import { useState } from "react";
import { Table } from "@/components/ui/table";
import { EditMemberModal } from "./edit-member/edit-member-modal";
import { DeleteMemberDialog } from "./edit-member/delete-member-dialog";
import { type Member } from "@/features/workforce/types/workforce";
import { UserTableHeader } from "./user-table/user-table-header";
import { UserTableBody } from "./user-table/user-table-body";
import { UserTableSkeleton } from "./user-table/user-table-skeleton";

interface UserTableProps {
  members: Member[];
  isLoading: boolean;
}

export function UserTable({ members, isLoading }: UserTableProps) {
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

  if (isLoading) return <UserTableSkeleton />;

  return (
    <>
      <div className="rounded-lg border bg-card overflow-hidden">
        <Table>
          <UserTableHeader />
          <UserTableBody
            members={members}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
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
