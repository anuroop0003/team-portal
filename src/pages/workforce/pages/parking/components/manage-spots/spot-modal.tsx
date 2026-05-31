import { useEffect, useId } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import {
  parkingSpotSchema,
  type ParkingSpotFormValues,
} from "@/validations/parking.schema";

interface SpotModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (
    spotData: Omit<ParkingSpot, "assignedTo" | "vehiclePlate" | "vehicleModel">,
  ) => void;
  initialSpot?: ParkingSpot | null;
}

export function SpotModal({
  open,
  onOpenChange,
  onSave,
  initialSpot,
}: SpotModalProps) {
  const formId = useId();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<ParkingSpotFormValues>({
    resolver: zodResolver(parkingSpotSchema),
    mode: "onChange",
    defaultValues: {
      spotNumber: "",
      floor: "",
      type: "Standard",
      status: "Available",
      locationName: "",
      locationMapUrl: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (initialSpot) {
        setValue("spotNumber", initialSpot.spotNumber);
        setValue("floor", initialSpot.floor);
        setValue("type", initialSpot.type);
        setValue("status", initialSpot.status);
        setValue("locationName", initialSpot.locationName || "");
        setValue("locationMapUrl", initialSpot.locationMapUrl || "");
      } else {
        setValue("spotNumber", "");
        setValue("floor", "");
        setValue("type", "Standard");
        setValue("status", "Available");
        setValue("locationName", "");
        setValue("locationMapUrl", "");
      }
    }
  }, [open, initialSpot, setValue]);

  const onSubmit = (data: ParkingSpotFormValues) => {
    onSave({
      id: initialSpot?.id || `spot-${Date.now()}`,
      spotNumber: data.spotNumber,
      floor: data.floor,
      type: data.type,
      status: data.status,
      locationName: data.locationName || undefined,
      locationMapUrl: data.locationMapUrl || undefined,
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
              {initialSpot
                ? `Edit Slot ${initialSpot.spotNumber}`
                : "Create Parking Slot"}
            </DialogTitle>
            <DialogDescription>
              {initialSpot
                ? "Modify the physical parking slot definition."
                : "Create a new physical parking slot in the facility."}
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="gap-4 py-4">
            <Field className="gap-2!">
              <Label htmlFor="spotNumber">Spot Number</Label>
              <Input
                id="spotNumber"
                placeholder="e.g. P-205"
                {...register("spotNumber")}
              />
              <FieldError errors={[errors.spotNumber]} />
            </Field>

            <Field className="gap-2!">
              <Label htmlFor="floor">Floor</Label>
              <Input
                id="floor"
                placeholder="e.g. Ground Floor or Basement 1"
                {...register("floor")}
              />
              <FieldError errors={[errors.floor]} />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field className="gap-2!">
                <Label htmlFor="type">Spot Type</Label>
                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(val) => field.onChange(val)}
                    >
                      <SelectTrigger className="cursor-pointer w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="cursor-pointer" value="Standard">
                          Standard
                        </SelectItem>
                        <SelectItem
                          className="cursor-pointer"
                          value="EV Charging"
                        >
                          EV Charging
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="Reserved">
                          Reserved
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="Compact">
                          Compact
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="Bike">
                          Bike
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.type]} />
              </Field>

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
                        <SelectItem
                          className="cursor-pointer"
                          value="Available"
                        >
                          Available
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="Occupied">
                          Occupied
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="Reserved">
                          Reserved
                        </SelectItem>
                        <SelectItem
                          className="cursor-pointer"
                          value="Maintenance"
                        >
                          Maintenance
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.status]} />
              </Field>
            </div>

            <Field className="gap-2!">
              <Label htmlFor="locationName">Location Identifier</Label>
              <Input
                id="locationName"
                placeholder="e.g. East Parking Lot"
                {...register("locationName")}
              />
              <FieldError errors={[errors.locationName]} />
            </Field>

            <Field className="gap-2!">
              <Label htmlFor="locationMapUrl">Location Google Maps URL</Label>
              <Input
                id="locationMapUrl"
                placeholder="e.g. https://maps.google.com/?q=..."
                {...register("locationMapUrl")}
              />
              <FieldError errors={[errors.locationMapUrl]} />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              form={formId}
              type="submit"
              className="cursor-pointer"
              disabled={!isValid}
            >
              Save Slot
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
