import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  addMemberSchema,
  type AddMemberValues,
} from "@/validations/member.schema";

interface EditMemberFormProps {
  initialValues: AddMemberValues;
  onSubmit: (data: AddMemberValues) => Promise<void>;
  onDelete: () => void;
  isSubmitting: boolean;
}

const ROLE_OPTIONS = [
  { label: "Select a role", value: null },
  { label: "User", value: "user" },
  { label: "Manager", value: "manager" },
  { label: "Admin", value: "admin" },
] as const;

export function EditMemberForm({
  initialValues,
  onSubmit,
  onDelete,
  isSubmitting,
}: EditMemberFormProps) {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddMemberValues>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: initialValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <Label htmlFor="edit-name">Full Name</Label>
          <Input
            {...register("name")}
            id="edit-name"
            placeholder="John Doe"
            disabled={isSubmitting}
          />
          <FieldError errors={[errors.name]} />
        </Field>

        <Field>
          <Label htmlFor="edit-email">Email Address</Label>
          <Input
            {...register("email")}
            id="edit-email"
            type="email"
            placeholder="john.doe@company.com"
            disabled={true} // Email is locked for editing
            className="bg-muted/50"
          />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field>
          <Label htmlFor="edit-position">Position</Label>
          <Input
            {...register("position")}
            id="edit-position"
            placeholder="Senior Developer"
            disabled={isSubmitting}
          />
          <FieldError errors={[errors.position]} />
        </Field>

        <Field>
          <Label htmlFor="edit-role">Access Role</Label>
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <Select
                value={field.value?.value ?? "null"}
                onValueChange={(val) => {
                  const selectedOption = ROLE_OPTIONS.find(
                    (o) => o.value === val,
                  );
                  field.onChange(selectedOption);
                }}
                disabled={isSubmitting}
              >
                <SelectTrigger id="edit-role" className="cursor-pointer">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {ROLE_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      className="cursor-pointer"
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={[errors.role]} />
        </Field>
      </FieldGroup>
      <DialogFooter className="mt-4 flex flex-col sm:flex-row gap-2">
        <Button
          type="button"
          variant="destructive"
          onClick={onDelete}
          disabled={isSubmitting}
          className="cursor-pointer sm:mr-auto"
        >
          <Trash2 />
          Delete
        </Button>

        <div className="flex gap-4">
          <DialogClose
            render={
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            }
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </DialogFooter>
    </form>
  );
}
