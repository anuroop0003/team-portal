import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "../../types/tasks";
import { getPriorityBadgeVariant } from "../../utils/tasks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Trash2, Link2 } from "lucide-react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface KanbanCardProps {
  task: Task;
  onEditClick: (task: Task) => void;
  onDeleteClick: (task: Task) => void;
}

export function KanbanCard({
  task,
  onEditClick,
  onDeleteClick,
}: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
    pointerEvents: isDragging ? ("none" as const) : undefined,
  };

  return (
    <Card
      size="sm"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="overflow-hidden relative group transition-all border-muted/50 shadow-2xs hover:bg-card/80 hover:border-primary/25 hover:shadow-xs cursor-grab active:cursor-grabbing touch-none"
    >
      <CardHeader className="flex flex-col">
        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
          {task.title}
        </CardTitle>
        <CardDescription className="text-xs line-clamp-3">
          {task.description}
        </CardDescription>
        <CardAction
          className="absolute bg-background border rounded-md top-2 right-2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="icon-sm"
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onEditClick(task);
            }}
          >
            <Edit />
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            className="cursor-pointer text-destructive/80 hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick(task);
            }}
          >
            <Trash2 />
          </Button>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={getPriorityBadgeVariant(task.priority)}>
            {task.priority}
          </Badge>

          {task.jiraKey && (
            <Badge
              variant="success"
              render={
                <a
                  href={task.jiraUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <Link2 />
              {task.jiraKey}
            </Badge>
          )}
        </div>

        {task.assignee ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Avatar className="size-7">
                    <AvatarImage
                      src={task.assignee.avatar}
                      alt={task.assignee.name}
                    />
                    <AvatarFallback>
                      {task.assignee.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                }
              ></TooltipTrigger>

              <TooltipContent>
                <p>{task.assignee.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <span className="text-[10px] text-muted-foreground italic">
            Unassigned
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
