import { useEffect, useMemo, useState } from "react";
import { SearchInput } from "@/components/search-input";
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
    <SearchInput
      wrapperClassName="max-w-md bg-card"
      placeholder="Search by spot number, floor, type, assignee, plate..."
      value={value}
      onChange={handleChange}
    />
  );
}
