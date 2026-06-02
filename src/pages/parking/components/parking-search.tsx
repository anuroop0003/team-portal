import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import debounce from "lodash.debounce";

interface ParkingSearchProps {
  onSearch: (value: string) => void;
}

export function ParkingSearch({ onSearch }: ParkingSearchProps) {
  const [value, setValue] = useState("");

  const debouncedSearch = useMemo(
    () => debounce((val: string) => onSearch(val), 500),
    [onSearch],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    debouncedSearch(val);
  };

  return (
    <InputGroup className="max-w-sm">
      <InputGroupInput
        placeholder="Search by spot number, floor, type, assignee, plate..."
        value={value}
        onChange={handleChange}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}
