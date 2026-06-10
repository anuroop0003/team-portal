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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DataTableAssigneeFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  icon?: React.ComponentType<{ className?: string }>;
  options: {
    label: string;
    value: string;
    avatar?: string;
  }[];
}

export function DataTableAssigneeFilter<TData, TValue>({
  column,
  title = "Assignee",
  icon: TriggerIcon,
  options,
}: DataTableAssigneeFilterProps<TData, TValue>) {
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
              <Badge variant="outline" className="leading-none rounded-sm ml-2">
                {selectedValues.size}
              </Badge>
            )}
          </Button>
        }
      />
      <PopoverContent className="w-[220px] p-0" align="start">
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
                    className="cursor-pointer flex items-center gap-2"
                    onSelect={() => handleSelect(option.value)}
                  >
                    {option.value !== "unassigned" && option.avatar ? (
                      <Avatar className="size-5 shrink-0">
                        <AvatarImage src={option.avatar} alt={option.label} />
                        <AvatarFallback className="text-[8px]">
                          {option.label.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="size-5 shrink-0 rounded-full bg-muted flex items-center justify-center text-[9px] italic font-semibold text-muted-foreground border">
                        U
                      </div>
                    )}
                    <span className="truncate flex-1">{option.label}</span>
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
