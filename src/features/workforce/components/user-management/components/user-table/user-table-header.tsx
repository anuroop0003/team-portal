import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function UserTableHeader() {
  return (
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
  );
}
