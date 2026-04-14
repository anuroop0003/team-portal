import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Focus } from "lucide-react";
import { CardAction } from "@/components/ui/card";

interface OrgControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRecenter: () => void;
}

export function OrgControls({
  onZoomIn,
  onZoomOut,
  onRecenter,
}: OrgControlsProps) {
  return (
    <CardAction className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={onZoomIn}
        className="cursor-pointer"
        title="Zoom In"
      >
        <ZoomIn />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onZoomOut}
        className="cursor-pointer"
        title="Zoom Out"
      >
        <ZoomOut />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onRecenter}
        className="cursor-pointer"
        title="Recenter"
      >
        <Focus />
      </Button>
    </CardAction>
  );
}
