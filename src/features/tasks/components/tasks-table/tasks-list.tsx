import { type Table as ReactTable, flexRender } from "@tanstack/react-table";
import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";
import { FileText } from "lucide-react";
import type { Task } from "../../types/tasks";
import { Fragment } from "react/jsx-runtime";

interface TasksListProps {
  table: ReactTable<Task>;
}

export function TasksList({ table }: TasksListProps) {
  const rows = table.getRowModel().rows;

  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-xl border border-dashed bg-card/40">
        <FileText className="size-10 text-muted-foreground/60 mb-2.5" />
        <p className="text-sm text-muted-foreground font-medium">
          No tasks match your filter/search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-background hover:bg-background"
            >
              {headerGroup.headers.map((header) => (
                <Fragment key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </Fragment>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Fragment key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Fragment>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
