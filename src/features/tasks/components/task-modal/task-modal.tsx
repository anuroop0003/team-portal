import { useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Task } from "../../types/tasks";
import { taskSchema } from "../../validations/task.schema";
import type { TaskFormValues } from "../../validations/task.schema";
import { TaskForm } from "./task-form";
import { MOCK_WORKFORCE } from "@/features/workforce/components/constants";

interface TaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (taskData: Task) => void;
  initialTask?: Task | null;
}

export function TaskModal({
  open,
  onOpenChange,
  onSave,
  initialTask,
}: TaskModalProps) {
  const formId = useId();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      status: "Todo",
      priority: "Medium",
      assigneeId: "",
      dueDate: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (initialTask) {
        setValue("title", initialTask.title);
        setValue("description", initialTask.description);
        setValue("status", initialTask.status);
        setValue("priority", initialTask.priority);
        setValue("assigneeId", initialTask.assignee?.id || "");
        setValue("dueDate", initialTask.dueDate);
      } else {
        setValue("title", "");
        setValue("description", "");
        setValue("status", "Todo");
        setValue("priority", "Medium");
        setValue("assigneeId", "");
        setValue("dueDate", "");
      }
    }
  }, [open, initialTask, setValue]);

  const onSubmit = (data: TaskFormValues) => {
    const assignee = MOCK_WORKFORCE.find((m) => m.id === data.assigneeId);

    onSave({
      id: initialTask?.id || `task-${Date.now()}`,
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      assignee: assignee
        ? {
            id: assignee.id,
            name: assignee.name,
            email: assignee.email,
            avatar: assignee.avatar,
          }
        : undefined,
      dueDate: data.dueDate,
      createdAt:
        initialTask?.createdAt || new Date().toISOString().split("T")[0],
      jiraKey: initialTask?.jiraKey,
      jiraUrl: initialTask?.jiraUrl,
    });
  };

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <form
          id={formId}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <DialogHeader>
            <DialogTitle>
              {initialTask ? "Edit Task" : "Create New Task"}
            </DialogTitle>
            <DialogDescription>
              {initialTask
                ? "Update the details of your existing task."
                : "Create a new task for your project workspace."}
            </DialogDescription>
          </DialogHeader>

          <TaskForm
            formId={formId}
            register={register}
            control={control}
            errors={errors}
            isValid={isValid}
            onCancel={() => handleOpenChange(false)}
            isEditMode={!!initialTask}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
