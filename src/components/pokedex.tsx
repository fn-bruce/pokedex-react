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
import { DOTS, usePagination } from "@/hooks/use-pagination";
import usePokemonService from "@/hooks/use-pokemon-service";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle, Search, Shuffle } from "lucide-react";
import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import Item from "./item";
import Results from "./results";

const PAGE_SIZE = 9;
const SIBLING_COUNT = 1;

export function Pokedex(): React.ReactElement {
  const [pokemon, setPokemon] = useState<Pokemon[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { error, loading, getAllPokemon } = usePokemonService({});

  const { toast } = useToast();
  const { paginationRange } = usePagination({
    totalCount,
    currentPage,
    pageSize: PAGE_SIZE,
    siblingCount: SIBLING_COUNT,
  });

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
      if (!filteredPokemon) {
        setPokemon(null);
        setTotalCount(0);
      } else {
        setPokemon(filteredPokemon);
        setTotalCount(filteredPokemon.length);
      }

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
      setCurrentPage(1);
    }
  };

  const handleShuffle = async (): Promise<void> => {
    try {
      const allPokemon = await getAllPokemon();
      if (!allPokemon) return;
      const randomIndex = Math.floor(Math.random() * allPokemon.length);
      setPokemon([allPokemon[randomIndex]]);
      toast({
        description: `Randomized Pokémon`,
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
      setCurrentPage(1);
      setTotalCount(1);
    }
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePrevious = (_e: MouseEvent<HTMLAnchorElement>): void => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = (_e: MouseEvent<HTMLAnchorElement>): void => {
    setCurrentPage(currentPage + 1);
  };

  const goToPage = (page: number): void => {
    setCurrentPage(page);
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
        <Button disabled={loading} onClick={handleShuffle}>
          <Shuffle />
        </Button>
      </div>
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <LoaderCircle className="animate-spin w-36 h-36" />
        </div>
      )}
      <Results
        pokemon={pokemon}
        currentPage={currentPage}
        pageSize={PAGE_SIZE}
      />
      {pokemon && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="hover:cursor-pointer select-none"
                onClick={handlePrevious}
              />
            </PaginationItem>
            {paginationRange.map((page, i) => {
              if (page === DOTS) {
                return (
                  <PaginationItem key={i}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return (
                <PaginationItem key={i}>
                  <PaginationLink
                    className="hover:cursor-pointer select-none"
                    onClick={() => goToPage(page)}
                    isActive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
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
