import { type Table } from "@tanstack/react-table";
import { Search, Filter, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const typeFilter =
    (table.getColumn("type")?.getFilterValue() as string) ?? "all";

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="relative flex-1 w-full group">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input
          placeholder="Search transactions..."
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="pl-10 bg-muted/40 border-none ring-1 ring-border/20 focus-visible:ring-primary/40 transition-all rounded-md h-10 w-full"
        />
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="outline"
              className="w-full sm:w-[140px] bg-muted/40 border-none ring-1 ring-border/20 rounded-md h-10 justify-between font-medium cursor-pointer hover:bg-muted/60 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Filter className="text-muted-foreground size-4" />
                <span>{typeFilter === "all" ? "All Types" : typeFilter}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 rounded-md border-border/40 backdrop-blur-xl shadow-2xl"
          >
            {["all", "Earned", "Redeemed"].map((type) => (
              <DropdownMenuItem
                key={type}
                onClick={() =>
                  table
                    .getColumn("type")
                    ?.setFilterValue(type === "all" ? "" : type)
                }
                className="justify-between cursor-pointer"
              >
                {type === "all" ? "All Types" : type}
                {((type === "all" && !typeFilter) || typeFilter === type) && (
                  <Check className="size-4" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
