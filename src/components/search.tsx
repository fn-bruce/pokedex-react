import { Search as SearchIcon, Shuffle } from "lucide-react";
import { ChangeEvent, ForwardedRef, forwardRef, KeyboardEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface SearchProps {
  query: string;
  loading: boolean;
  onChange: (newValue: string) => void;
  onSearch: () => Promise<void>;
  onShuffle: () => Promise<void>;
}

const Search = forwardRef<HTMLInputElement, SearchProps>(
  (
    { query, loading, onChange, onSearch, onShuffle }: SearchProps,
    ref: ForwardedRef<HTMLInputElement>,
  ): React.ReactElement => {
    const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === "Enter") {
        onSearch();
      }
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
      onChange(e.currentTarget.value);
    };

    return (
      <div className="flex gap-4">
        <Input
          ref={ref}
          value={query}
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
