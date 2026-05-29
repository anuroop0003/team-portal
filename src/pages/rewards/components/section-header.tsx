import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

interface SectionHeaderProps {
  title: string;
  description?: string;
  onViewAll?: () => void;
  viewAllLabel?: string;
  href?: string;
}

export function SectionHeader({
  title,
  description,
  onViewAll,
  viewAllLabel = "View all",
  href,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="space-y-0.5">
        <h2 className="text-lg font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      {(onViewAll || href) && (
        <Link
          to={href || "#"}
          onClick={onViewAll}
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
            className:
              "cursor-pointer text-indigo-600 hover:text-indigo-700 group",
          })}
        >
          {viewAllLabel}
          <ArrowRight className="ml-1 size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
