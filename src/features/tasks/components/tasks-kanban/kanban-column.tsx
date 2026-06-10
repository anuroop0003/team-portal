import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Task, TaskStatus } from "../../types/tasks";
import { Badge } from "@/components/ui/badge";
import { KanbanCard } from "./kanban-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onEditClick: (task: Task) => void;
  onDeleteClick: (task: Task) => void;
}

export function KanbanColumn({
  status,
  tasks,
  onEditClick,
  onDeleteClick,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <Card
      size="sm"
      className={cn(
        "h-full min-h-[600px] bg-muted/30 border-muted/50 transition-colors duration-200",
        isOver && "bg-accent/40 ring-1 ring-primary/20",
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-sm font-semibold">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "size-2.5 rounded-xs",
                status === "Todo" && "bg-muted-foreground/60",
                status === "In Progress" && "bg-blue-500",
                status === "In Review" && "bg-amber-500",
                status === "Done" && "bg-emerald-500",
              )}
            />
            <span>{status}</span>
          </div>
          <Badge className="rounded-md leading-none" variant="indigo">
            {tasks.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent
        ref={setNodeRef}
        className="flex-1 space-y-3 p-2 min-h-[200px] overflow-y-auto"
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-lg border border-dashed border-muted-foreground/20 bg-card/25 text-muted-foreground text-xs font-medium h-32">
              No tasks in {status}
            </div>
          ) : (
            tasks.map((task) => (
              <KanbanCard
                key={task.id}
                task={task}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
              />
            ))
          )}
        </SortableContext>
      </CardContent>
    </Card>
  );
}
