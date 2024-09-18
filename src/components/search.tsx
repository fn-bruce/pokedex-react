import { Search as SearchIcon, Shuffle } from "lucide-react";
import { ChangeEvent, KeyboardEvent, useState, forwardRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface SearchProps {
  loading: boolean;
  onChange: (newValue: string) => void;
  onSearch: () => Promise<void>;
  onShuffle: () => Promise<void>;
}

const Search = forwardRef<HTMLInputElement, SearchProps>(
  ({ loading, onChange, onSearch, onShuffle }, ref): React.ReactElement => {
    const [input, setInput] = useState("");

    const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === "Enter") {
        onSearch();
      }
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
      setInput(e.currentTarget.value);
      onChange(e.currentTarget.value);
    };

    return (
      <div className="flex gap-4">
        <Input
          ref={ref}
          value={input}
          onChange={handleOnChange}
          onKeyUp={handleKeyUp}
          placeholder="Search for a pokemon..."
        />
        <Button disabled={loading} onClick={onSearch}>
          <SearchIcon />
        </Button>
        <Button disabled={loading} onClick={onShuffle}>
          <Shuffle />
        </Button>
      </div>
    );
  },
);

export default Search;
