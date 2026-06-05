import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import debounce from "lodash.debounce";

interface ManagementSearchProps {
  onSearch: (value: string) => void;
}

export function ManagementSearch({ onSearch }: ManagementSearchProps) {
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
    <InputGroup className="max-w-md bg-card">
      <InputGroupInput
        placeholder="Search by name, email, position or role..."
        value={value}
        onChange={handleChange}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}
