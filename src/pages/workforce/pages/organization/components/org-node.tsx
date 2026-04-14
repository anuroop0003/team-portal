import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

interface OrgNodeProps {
  nodeDatum: any;
  toggleNode: () => void;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export function OrgNode({ nodeDatum, toggleNode }: OrgNodeProps) {
  const initials = getInitials(nodeDatum.name);
  const isExpanded = !nodeDatum.__rd3t.collapsed;

  return (
    <g>
      <foreignObject width="240" height="200" x="-120" y="-80">
        <Card className="group relative m-px overflow-visible">
          <CardHeader>
            <CardTitle>{nodeDatum.name}</CardTitle>
            <CardDescription>
              {nodeDatum.attributes?.position || "Position"}
            </CardDescription>
            <CardAction>
              <Avatar className="size-10">
                <AvatarImage src={nodeDatum.attributes?.avatar} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </CardAction>
          </CardHeader>

          {/* Expand/Collapse Button */}
          {nodeDatum.children && nodeDatum.children.length > 0 && (
            <Button
              size="icon-xs"
              className="absolute -bottom-3.5 left-1/2 z-20 -translate-x-1/2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                toggleNode();
              }}
            >
              {isExpanded ? <Minus /> : <Plus />}
            </Button>
          )}
        </Card>
      </foreignObject>
    </g>
  );
}
