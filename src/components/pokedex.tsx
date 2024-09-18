import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import usePokemonService from "@/hooks/use-pokemon-service";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle, Search, Shuffle } from "lucide-react";
import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import pokeball from "../assets/pokeball.png";

export function Pokedex(): React.ReactElement {
  const [pokemon, setPokemon] = useState<Pokemon[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState("");
  const [offset, setOffset] = useState(0);
  const [length, setLength] = useState(9);

  const { error, loading, getAllPokemon } = usePokemonService({});

  const { toast } = useToast();

  useEffect((): void => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = async (): Promise<void> => {
    try {
      const allPokemon = await getAllPokemon();
      const filteredPokemon =
        allPokemon?.filter((p: Pokemon): boolean => {
          return p.name.includes(searchInput);
        }) ?? null;
      setPokemon(filteredPokemon);
      toast({
        description: `Found ${filteredPokemon?.length} Pokémon`,
        duration: 3000,
      });
    } catch {
      toast({
        title: "Error",
        description: error?.message,
        duration: 3000,
        variant: "destructive",
      });
    } finally {
      setOffset(0);
    }
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePrevious = (_e: MouseEvent<HTMLAnchorElement>): void => {
    if (offset - 1 >= 0) {
      setOffset(offset - 1);
    }
  };

  const handleNext = (_e: MouseEvent<HTMLAnchorElement>): void => {
    if (pokemon && offset + 1 < pokemon.length / length) {
      setOffset(offset + 1);
    }
  };

  const goToPage = (page: number): void => {
    setOffset(page);
  };

  return (
    <div className="h-full flex flex-col gap-4 items-center py-8">
      <h1 className="text-4xl bold">Pokédex</h1>
      <div className="flex gap-4">
        <Input
          ref={inputRef}
          value={searchInput}
          onChange={(e) => setSearchInput(e.currentTarget.value)}
          onKeyUp={handleKeyUp}
          placeholder="Search for a pokemon..."
        />
        <Button disabled={loading} onClick={handleSearch}>
          <Search />
        </Button>
        <Button disabled={loading}>
          <Shuffle />
        </Button>
      </div>
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <LoaderCircle className="animate-spin w-36 h-36" />
        </div>
      )}
      <div className="h-[790px] w-[790px] flex flex-wrap gap-4">
        {pokemon?.slice(offset * length, offset * length + length).map(
          (p: Pokemon, index: number): React.ReactElement => (
            <Card
              key={index}
              className="w-[250px] h-[250px] flex flex-col items-center"
            >
              <CardHeader>
                <CardTitle>{p.name}</CardTitle>
                <CardDescription className="text-center">
                  #{p.id}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <img src={p.spriteUrl} alt={p.name} />
              </CardContent>
            </Card>
          ),
        )}
      </div>
      {pokemon && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="hover:cursor-pointer select-none"
                onClick={handlePrevious}
              />
            </PaginationItem>
            {offset - 1 >= 0 && (
              <PaginationItem>
                <PaginationLink
                  className="hover:cursor-pointer select-none"
                  onClick={() => goToPage(offset - 1)}
                >
                  {offset}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                className="hover:cursor-pointer select-none"
                isActive
              >
                {offset + 1}
              </PaginationLink>
            </PaginationItem>
            {pokemon && offset + 1 < pokemon.length / length && (
              <PaginationItem>
                <PaginationLink
                  className="hover:cursor-pointer select-none"
                  onClick={() => goToPage(offset + 1)}
                >
                  {offset + 2}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                className="hover:cursor-pointer select-none"
                onClick={handleNext}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
