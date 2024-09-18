import { Search as SearchIcon, Shuffle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, KeyboardEvent, ChangeEvent } from "react";

interface SearchProps {
  ref: React.RefObject<HTMLInputElement>;
  loading: boolean;
  onChange: (newValue: string) => void;
  onSearch: () => Promise<void>;
  onShuffle: () => Promise<void>;
}
const Search = ({
  ref,
  loading,
  onChange,
  onSearch,
  onShuffle,
}: SearchProps): React.ReactElement => {
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
};

export default Search;
