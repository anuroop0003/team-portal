import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Focus } from "lucide-react";

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
    <div className="flex items-center gap-1 absolute top-4 right-4 z-10">
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
    </div>
  );
}
