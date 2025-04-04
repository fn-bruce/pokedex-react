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
import { LoaderCircle } from "lucide-react";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Results from "./results";
import Search from "./search";

const PAGE_SIZE = 9;
const SIBLING_COUNT = 1;

export function Pokedex(): React.ReactElement {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [pokemon, setPokemon] = useState<Pokemon[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState(queryParams.get("query") ?? "");

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
    search();

    const page = queryParams.get("page") as number | null;
    if (page) {
      setCurrentPage(+page);
    }
  }, []);

  const search = async (): Promise<void> => {
    try {
      const allPokemon = await getAllPokemon();
      const filteredPokemon =
        allPokemon?.filter((p: Pokemon): boolean => {
          return p.name.includes(query);
        }) ?? null;
      if (!filteredPokemon) {
        setPokemon(null);
        setTotalCount(0);
      } else {
        setPokemon(filteredPokemon);
        setTotalCount(filteredPokemon.length);
      }

      toast({
        title: "Success",
        description: `Found ${filteredPokemon?.length} Pokémon`,
        duration: 3000,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: (err as Error).message,
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  const handleSearch = async (): Promise<void> => {
    search();
    queryParams.set("query", query);
    queryParams.set("page", "1");
    setCurrentPage(1);
    navigate({
      pathname: location.pathname,
      search: queryParams.toString(),
    });
  };

  const handleShuffle = async (): Promise<void> => {
    try {
      const allPokemon = await getAllPokemon();
      if (!allPokemon) return;
      const randomIndex = Math.floor(Math.random() * allPokemon.length);
      setPokemon([allPokemon[randomIndex]]);
      setCurrentPage(1);
      queryParams.set("page", "1");
      navigate({
        pathname: location.pathname,
        search: queryParams.toString(),
      });
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

  const handleChange = (newValue: string) => {
    setQuery(newValue);
    queryParams.set("query", newValue);
    navigate({
      pathname: location.pathname,
      search: queryParams.toString(),
    });
  };

  const handlePrevious = (_e: MouseEvent<HTMLAnchorElement>): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      queryParams.set("page", `${currentPage - 1}`);
      navigate({
        pathname: location.pathname,
        search: queryParams.toString(),
      });
    }
  };

  const handleNext = (_e: MouseEvent<HTMLAnchorElement>): void => {
    if (currentPage < Math.ceil(totalCount / PAGE_SIZE)) {
      setCurrentPage(currentPage + 1);
      queryParams.set("page", `${currentPage + 1}`);
      navigate({
        pathname: location.pathname,
        search: queryParams.toString(),
      });
    }
  };

  const goToPage = (page: number): void => {
    setCurrentPage(page);
    queryParams.set("page", `${page}`);
    navigate({
      pathname: location.pathname,
      search: queryParams.toString(),
    });
  };

  return (
    <div className="h-full flex flex-col gap-4 items-center py-8">
      <h1 className="text-4xl bold">Pokédex</h1>
      <Search
        ref={inputRef}
        query={query}
        loading={loading}
        onChange={handleChange}
        onSearch={handleSearch}
        onShuffle={handleShuffle}
      />
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
      {pokemon && pokemon.length !== 0 && (
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
