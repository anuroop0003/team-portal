import { type Table } from "@tanstack/react-table";
import {
  LayoutGrid,
  List,
  ListTodo,
  ArrowUpNarrowWide,
  Users,
} from "lucide-react";
import { SearchInput } from "@/components/search-input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableAssigneeFilter } from "./data-table-assignee-filter";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_WORKFORCE } from "@/features/workforce/components/constants";
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "../constants";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onTabChange: (tab: string) => void;
}

const statusOptions = STATUS_OPTIONS.map((opt) => ({
  label: opt.label,
  value: opt.value,
  icon: <opt.icon className={opt.className} />,
}));

const priorityOptions = PRIORITY_OPTIONS.map((opt) => ({
  label: opt.label,
  value: opt.value,
  icon: <opt.icon className={opt.className} />,
}));

export function DataTableToolbar<TData>({
  table,
  onTabChange,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
      <div className="flex flex-wrap flex-1 items-center gap-2 w-full lg:w-auto">
        <SearchInput
          wrapperClassName="max-w-md bg-card"
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
        />

        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            icon={ListTodo}
            options={statusOptions}
          />
        )}

        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            icon={ArrowUpNarrowWide}
            options={priorityOptions}
          />
        )}

        {table.getColumn("assignee") && (
          <DataTableAssigneeFilter
            column={table.getColumn("assignee")}
            title="Assignee"
            icon={Users}
            options={[
              { label: "Unassigned", value: "unassigned" },
              ...MOCK_WORKFORCE.map((member) => ({
                label: member.name,
                value: member.id,
                avatar: member.avatar,
              })),
            ]}
          />
        )}
      </div>

      {/* View Toggles */}
      <TabsList className="w-full sm:w-auto shrink-0 lg:ml-auto grid grid-cols-2 min-w-[200px]">
        <TabsTrigger
          value="kanban"
          className="cursor-pointer"
          onClick={() => onTabChange("kanban")}
        >
          <LayoutGrid />
          <span>Kanban</span>
        </TabsTrigger>
        <TabsTrigger
          value="list"
          className="cursor-pointer"
          onClick={() => onTabChange("list")}
        >
          <List />
          <span>List View</span>
        </TabsTrigger>
      </TabsList>
    </div>
  );
}
