import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex-1 flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground font-medium">
          {description}
        </p>
      </div>
      {children && (
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {children}
        </div>
      )}
    </div>
  );
}
