import {
  type Control,
  type FieldErrors,
  type UseFormRegister,
  Controller,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type ParkingSpot } from "../../constants";
import { MOCK_WORKFORCE } from "@/features/workforce/components/constants";
import { type AssignParkingFormValues } from "@/features/parking/validations/parking.schema";

interface AssignFormProps {
  formId: string;
  register: UseFormRegister<AssignParkingFormValues>;
  control: Control<AssignParkingFormValues>;
  errors: FieldErrors<AssignParkingFormValues>;
  availableSpots: ParkingSpot[];
  isValid: boolean;
  onCancel: () => void;
}

export function AssignForm({
  formId,
  register,
  control,
  errors,
  availableSpots,
  isValid,
  onCancel,
}: AssignFormProps) {
  return (
    <>
      <FieldGroup className="gap-4 py-4">
        <Field className="gap-2!">
          <Label htmlFor="spot">Parking Spot</Label>
          <Controller
            control={control}
            name="spotId"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(val) => field.onChange(val)}
              >
                <SelectTrigger className="cursor-pointer w-full">
                  <SelectValue placeholder="Select a spot" />
                </SelectTrigger>
                <SelectContent>
                  {availableSpots.map((spot) => (
                    <SelectItem
                      key={spot.id}
                      className="cursor-pointer"
                      value={spot.id}
                    >
                      {spot.spotNumber} ({spot.floor} - {spot.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={[errors.spotId]} />
        </Field>

        <Field className="gap-2!">
          <Label htmlFor="member">Workforce Member</Label>
          <Controller
            control={control}
            name="memberId"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(val) => field.onChange(val)}
              >
                <SelectTrigger className="cursor-pointer w-full">
                  <SelectValue placeholder="Select a member" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_WORKFORCE.map((member) => (
                    <SelectItem
                      key={member.id}
                      className="cursor-pointer"
                      value={member.id}
                    >
                      {member.name} ({member.position})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={[errors.memberId]} />
        </Field>

        <Field className="gap-2!">
          <Label htmlFor="plate">Vehicle License Plate</Label>
          <Input
            id="plate"
            placeholder="e.g. CA-99X88"
            {...register("vehiclePlate")}
          />
          <FieldError errors={[errors.vehiclePlate]} />
        </Field>

        <Field className="gap-2!">
          <Label htmlFor="model">Vehicle Model & Color</Label>
          <Input
            id="model"
            placeholder="e.g. Tesla Model 3 (Midnight Gray)"
            {...register("vehicleModel")}
          />
          <FieldError errors={[errors.vehicleModel]} />
        </Field>
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
          Save Assignment
        </Button>
      </DialogFooter>
    </>
  );
}
