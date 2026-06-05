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
import { type ParkingSpot } from "../../constants";
import { AssignForm } from "./assign-form";
import {
  assignParkingSchema,
  type AssignParkingFormValues,
} from "@/features/parking/validations/parking.schema";

interface AssignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssign: (
    spotId: string,
    memberId: string,
    vehiclePlate: string,
    vehicleModel: string,
  ) => void;
  spots: ParkingSpot[];
  initialSpot?: ParkingSpot | null;
}

export function AssignModal({
  open,
  onOpenChange,
  onAssign,
  spots,
  initialSpot,
}: AssignModalProps) {
  const formId = useId();

  const availableSpots = spots.filter(
    (s) => s.status === "Available" || s.id === initialSpot?.id,
  );

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<AssignParkingFormValues>({
    resolver: zodResolver(assignParkingSchema),
    mode: "onChange",
    defaultValues: {
      spotId: "",
      memberId: "",
      vehiclePlate: "",
      vehicleModel: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (initialSpot) {
        setValue("spotId", initialSpot.id);
        if (initialSpot.assignedTo) {
          setValue("memberId", initialSpot.assignedTo.id);
          setValue("vehiclePlate", initialSpot.vehiclePlate || "");
          setValue("vehicleModel", initialSpot.vehicleModel || "");
        } else {
          setValue("memberId", "");
          setValue("vehiclePlate", "");
          setValue("vehicleModel", "");
        }
      } else {
        setValue("spotId", availableSpots[0]?.id || "");
        setValue("memberId", "");
        setValue("vehiclePlate", "");
        setValue("vehicleModel", "");
      }
    }
  }, [open, initialSpot, spots, setValue]);

  const onSubmit = (data: AssignParkingFormValues) => {
    onAssign(data.spotId, data.memberId, data.vehiclePlate, data.vehicleModel);
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
                : "Assign Parking Spot"}
            </DialogTitle>
            <DialogDescription>
              Assign a corporate parking slot to a workforce member and record
              their vehicle details.
            </DialogDescription>
          </DialogHeader>

          <AssignForm
            formId={formId}
            register={register}
            control={control}
            errors={errors}
            availableSpots={availableSpots}
            isValid={isValid}
            onCancel={() => handleOpenChange(false)}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
