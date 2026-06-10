import type { ColumnDef } from "@tanstack/react-table";
import type { Task } from "../../types/tasks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "../constants";
import { Trash2, Edit } from "lucide-react";
import { TableCell, TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const statusConfig = Object.fromEntries(
  STATUS_OPTIONS.map((opt) => [
    opt.value,
    { label: opt.label, icon: opt.icon, className: opt.className },
  ]),
);

const priorityConfig = Object.fromEntries(
  PRIORITY_OPTIONS.map((opt) => [
    opt.value,
    { label: opt.label, icon: opt.icon, className: opt.className },
  ]),
);

export const getColumns = (
  onEditClick: (task: Task) => void,
  onDeleteClick: (task: Task) => void,
): ColumnDef<Task>[] => [
  {
    accessorKey: "id",
    header: () => <TableHead className="h-12 px-4">Task</TableHead>,
    cell: ({ row }) => (
      <TableCell className="py-3 px-4">{row.original.id}</TableCell>
    ),
  },
  {
    accessorKey: "title",
    header: () => <TableHead className="h-12 px-4">Title</TableHead>,
    cell: ({ row }) => {
      const task = row.original;
      return (
        <TableCell className="py-3 px-4 whitespace-normal">
          <div className="flex flex-col gap-1 max-w-[320px]">
            <div className="flex items-center gap-2">
              {task.jiraUrl ? (
                <a
                  href={task.jiraUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-sm text-foreground hover:text-primary hover:underline truncate block"
                >
                  {task.title}
                </a>
              ) : (
                <span className="font-medium text-sm text-foreground truncate block">
                  {task.title}
                </span>
              )}
              {task.jiraKey && <Badge variant="success">{task.jiraKey}</Badge>}
            </div>
            {task.description && (
              <span className="text-xs text-muted-foreground line-clamp-2">
                {task.description}
              </span>
            )}
          </div>
        </TableCell>
      );
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "status",
    header: () => <TableHead className="h-12 px-4">Status</TableHead>,
    cell: ({ row }) => {
      const status = row.getValue("status") as Task["status"];
      const config = statusConfig[status] || STATUS_OPTIONS[0];
      const Icon = config.icon;
      return (
        <TableCell className="py-3 px-4">
          <div className="flex items-center">
            <Icon className={cn("mr-2 size-4 shrink-0", config.className)} />
            <span className="font-medium text-foreground">{config.label}</span>
          </div>
        </TableCell>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue.length === 0) return true;
      return filterValue.includes(row.getValue(columnId));
    },
  },
  {
    accessorKey: "priority",
    header: () => <TableHead className="h-12 px-4">Priority</TableHead>,
    cell: ({ row }) => {
      const priority = row.getValue("priority") as Task["priority"];
      const config = priorityConfig[priority] || PRIORITY_OPTIONS[1];
      const Icon = config.icon;
      return (
        <TableCell className="py-3 px-4">
          <div className="flex items-center">
            <Icon className={cn("mr-2 size-4 shrink-0", config.className)} />
            <span className="font-medium text-foreground">{config.label}</span>
          </div>
        </TableCell>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue.length === 0) return true;
      return filterValue.includes(row.getValue(columnId));
    },
  },
  {
    accessorKey: "assignee",
    header: () => <TableHead className="h-12 px-4">Assignee</TableHead>,
    cell: ({ row }) => {
      const assignee = row.original.assignee;
      if (!assignee) {
        return (
          <TableCell className="py-3 px-4 italic text-xs text-muted-foreground">
            Unassigned
          </TableCell>
        );
      }
      return (
        <TableCell className="py-3 px-4">
          <div className="flex items-center gap-3">
            <Avatar className="size-6 shrink-0">
              <AvatarImage src={assignee.avatar} alt={assignee.name} />
              <AvatarFallback className="text-[10px]">
                {assignee.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-foreground truncate">
              {assignee.name}
            </span>
          </div>
        </TableCell>
      );
    },
    filterFn: (row, _columnId, filterValue) => {
      if (!filterValue || filterValue.length === 0) return true;
      const assignee = row.original.assignee;
      return filterValue.some((val: string) => {
        if (val === "unassigned") return !assignee;
        return assignee?.id === val;
      });
    },
  },
  {
    accessorKey: "dueDate",
    header: () => <TableHead className="h-12 px-4">Due Date</TableHead>,
    cell: ({ row }) => {
      return (
        <TableCell className="py-3 px-4">{row.original.dueDate}</TableCell>
      );
    },
  },
  {
    id: "actions",
    header: () => (
      <TableHead className="w-[100px] text-right h-12 px-4">Actions</TableHead>
    ),
    cell: ({ row }) => {
      const task = row.original;
      return (
        <TableCell className="py-3 px-4 text-right">
          <div className="flex items-center justify-end gap-1.5">
            <Button
              variant="ghost"
              size="icon-sm"
              className="cursor-pointer"
              onClick={() => onEditClick(task)}
            >
              <Edit />
            </Button>

            <Button
              variant="ghost"
              size="icon-sm"
              className="cursor-pointer text-destructive/80 hover:text-destructive"
              onClick={() => onDeleteClick(task)}
            >
              <Trash2 />
            </Button>
          </div>
        </TableCell>
      );
    },
  },
];
