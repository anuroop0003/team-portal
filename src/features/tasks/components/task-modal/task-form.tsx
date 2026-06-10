import { Controller } from "react-hook-form";
import type { UseFormRegister, Control, FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldError } from "@/components/ui/field";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TaskFormValues } from "../../validations/task.schema";
import { MOCK_WORKFORCE } from "@/features/workforce/components/constants";

interface TaskFormProps {
  formId: string;
  register: UseFormRegister<TaskFormValues>;
  control: Control<TaskFormValues>;
  errors: FieldErrors<TaskFormValues>;
  isValid: boolean;
  onCancel: () => void;
  isEditMode: boolean;
}

export function TaskForm({
  formId,
  register,
  control,
  errors,
  isValid,
  onCancel,
  isEditMode,
}: TaskFormProps) {
  return (
    <div className="space-y-4">
      <FieldGroup className="gap-4 py-2">
        <Field className="gap-2!">
          <Label htmlFor="title">Task Title</Label>
          <Input
            id="title"
            placeholder="e.g. Write integration test cases"
            {...register("title")}
          />
          <FieldError errors={[errors.title]} />
        </Field>

        <Field className="gap-2!">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="e.g. Details and requirements for this task..."
            rows={3}
            {...register("description")}
          />
          <FieldError errors={[errors.description]} />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field className="gap-2!">
            <Label htmlFor="status">Status</Label>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(val) => field.onChange(val)}
                >
                  <SelectTrigger className="cursor-pointer w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="cursor-pointer" value="Todo">
                      Todo
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="In Progress">
                      In Progress
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="In Review">
                      In Review
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="Done">
                      Done
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[errors.status]} />
          </Field>

          <Field className="gap-2!">
            <Label htmlFor="priority">Priority</Label>
            <Controller
              control={control}
              name="priority"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(val) => field.onChange(val)}
                >
                  <SelectTrigger className="cursor-pointer w-full">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="cursor-pointer" value="Low">
                      Low
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="Medium">
                      Medium
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="High">
                      High
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="Critical">
                      Critical
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[errors.priority]} />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field className="gap-2!">
            <Label htmlFor="assigneeId">Assignee</Label>
            <Controller
              control={control}
              name="assigneeId"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(val) => field.onChange(val)}
                >
                  <SelectTrigger className="cursor-pointer w-full">
                    <SelectValue placeholder="Unassigned" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="cursor-pointer" value="">
                      Unassigned
                    </SelectItem>
                    {MOCK_WORKFORCE.map((member) => (
                      <SelectItem
                        key={member.id}
                        className="cursor-pointer"
                        value={member.id}
                      >
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[errors.assigneeId]} />
          </Field>

          <Field className="gap-2!">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              className="cursor-pointer w-full"
              {...register("dueDate")}
            />
            <FieldError errors={[errors.dueDate]} />
          </Field>
        </div>
      </FieldGroup>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          form={formId}
          type="submit"
          className="cursor-pointer"
          disabled={!isValid}
        >
          {isEditMode ? "Save Changes" : "Create Task"}
        </Button>
      </DialogFooter>
    </div>
  );
}
