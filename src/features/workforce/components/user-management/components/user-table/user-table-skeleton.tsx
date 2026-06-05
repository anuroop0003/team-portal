import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { UserTableHeader } from "./user-table-header";

export function UserTableSkeleton() {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table>
        <UserTableHeader />
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i} className="animate-pulse">
              <TableCell className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-full bg-muted" />
                  <div className="flex flex-col gap-1.5">
                    <div className="h-3.5 w-24 rounded bg-muted" />
                    <div className="h-2.5 w-32 rounded bg-muted" />
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-3 px-4">
                <div className="h-3 w-20 rounded bg-muted" />
              </TableCell>
              <TableCell className="py-3 px-4">
                <div className="h-5.5 w-14 rounded-full bg-muted" />
              </TableCell>
              <TableCell className="py-3 px-4">
                <div className="h-5.5 w-16 rounded-full bg-muted" />
              </TableCell>
              <TableCell className="py-3 px-4">
                <div className="h-3 w-16 rounded bg-muted" />
              </TableCell>
              <TableCell className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <div className="size-8 rounded bg-muted" />
                  <div className="size-8 rounded bg-muted" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
