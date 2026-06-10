import { type Column } from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  icon?: React.ComponentType<{ className?: string }>;
  options: {
    label: string;
    value: string;
    icon?: React.ReactNode;
  }[];
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  icon: TriggerIcon,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  const handleSelect = (value: string) => {
    if (selectedValues.has(value)) {
      selectedValues.delete(value);
    } else {
      selectedValues.add(value);
    }
    const filterValues = Array.from(selectedValues);
    column?.setFilterValue(filterValues.length ? filterValues : undefined);
  };

  const Icon = TriggerIcon || PlusCircle;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" className="cursor-pointer border-input">
            <Icon className="shrink-0" />
            <span>{title}</span>
            {selectedValues?.size > 0 && (
              <Badge variant="outline" className="leading-none rounded-sm">
                {selectedValues.size}
              </Badge>
            )}
          </Button>
        }
      />
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    data-checked={isSelected}
                    className="cursor-pointer"
                    onSelect={() => handleSelect(option.value)}
                  >
                    {option.icon}
                    <span>{option.label}</span>
                    <span className="text-xs">
                      ({facets?.get(option.value)})
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
