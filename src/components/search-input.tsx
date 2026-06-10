import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
}

export function SearchInput({
  wrapperClassName = "max-w-md",
  className,
  ...props
}: SearchInputProps) {
  return (
    <InputGroup className={wrapperClassName}>
      <InputGroupInput className={className} {...props} />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}
