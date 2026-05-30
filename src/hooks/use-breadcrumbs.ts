import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export interface BreadcrumbItem {
  title: string;
  href: string;
  isLast: boolean;
}

export function useBreadcrumbs(): BreadcrumbItem[] {
  const location = useLocation();

  return useMemo(() => {
    const paths = location.pathname.split("/").filter(Boolean);
    return paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join("/")}`;
      const isLast = index === paths.length - 1;
      const title =
        path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");

      return { title, href, isLast };
    });
  }, [location]);
}
