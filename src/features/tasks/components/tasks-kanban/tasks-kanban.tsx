import { useState, useCallback, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import type { Task, TaskStatus } from "../../types/tasks";
import { KanbanColumn } from "./kanban-column";
import { KanbanCard } from "./kanban-card";

interface TasksKanbanProps {
  tasks: Task[];
  onEditClick: (task: Task) => void;
  onDeleteClick: (task: Task) => void;
  onTasksReorder?: (tasks: Task[]) => void;
}

const STATUSES: TaskStatus[] = ["Todo", "In Progress", "In Review", "Done"];

export function TasksKanban({
  tasks,
  onEditClick,
  onDeleteClick,
  onTasksReorder,
}: TasksKanbanProps) {
  // Own internal copy so drag state is not overridden by parent re-renders mid-drag
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Keep in sync when external tasks change (filter, add, delete)
  // but don't override while the user is actively dragging
  useEffect(() => {
    if (!activeTask) {
      setLocalTasks(tasks);
    }
  }, [tasks, activeTask]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // Require 8px movement so clicks on buttons still fire normally
        distance: 8,
      },
    }),
  );

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const task = localTasks.find((t) => t.id === event.active.id);
      setActiveTask(task ?? null);
    },
    [localTasks],
  );

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    setLocalTasks((prev) => {
      const dragged = prev.find((t) => t.id === activeId);
      if (!dragged) return prev;

      // Determine which column is being dragged over
      const isOverColumn = STATUSES.includes(overId as TaskStatus);
      const targetStatus: TaskStatus | undefined = isOverColumn
        ? (overId as TaskStatus)
        : prev.find((t) => t.id === overId)?.status;

      if (!targetStatus || dragged.status === targetStatus) return prev;

      // Move the card to the new column (append at end of that column)
      return prev.map((t) =>
        t.id === activeId ? { ...t, status: targetStatus } : t,
      );
    });
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveTask(null);

      if (!over) return;

      const activeId = active.id as string;
      const overId = over.id as string;

      const activeIdx = localTasks.findIndex((t) => t.id === activeId);
      const overIdx = localTasks.findIndex((t) => t.id === overId);

      if (activeIdx !== -1 && overIdx !== -1 && activeId !== overId) {
        const updated = arrayMove(localTasks, activeIdx, overIdx);
        setLocalTasks(updated);
        onTasksReorder?.(updated);
      }
    },
    [localTasks, onTasksReorder],
  );

  const getColumnTasks = (status: TaskStatus) =>
    localTasks.filter((t) => t.status === status);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        {STATUSES.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={getColumnTasks(status)}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </div>

      {/* Drag Overlay — floating ghost card while dragging, no drop animation */}
      <DragOverlay dropAnimation={null}>
        {activeTask && (
          <div className="rotate-1 scale-105 opacity-95">
            <KanbanCard
              task={activeTask}
              onEditClick={() => {}}
              onDeleteClick={() => {}}
            />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
