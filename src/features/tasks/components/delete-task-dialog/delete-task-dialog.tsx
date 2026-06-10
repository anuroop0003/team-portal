import { ConfirmDialog } from "@/components/confirm-dialog";
import type { Task } from "../../types/tasks";

interface DeleteTaskDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteTaskDialog({
  task,
  open,
  onOpenChange,
  onConfirm,
}: DeleteTaskDialogProps) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Task"
      description={
        <>
          Are you sure you want to delete task{" "}
          <strong className="text-foreground">"{task.title}"</strong>? This
          action cannot be undone and will permanently remove this task.
        </>
      }
      confirmText="Delete Task"
      onConfirm={onConfirm}
    />
  );
}
