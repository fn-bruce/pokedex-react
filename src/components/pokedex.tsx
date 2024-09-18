import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import usePokemonService from "@/hooks/use-pokemon-service";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle, Search, Shuffle } from "lucide-react";
import { KeyboardEvent, useState } from "react";

export function Pokedex(): React.ReactElement {
  const [pokemon, setPokemon] = useState<Pokemon[] | null>(null);
  const [searchInput, setSearchInput] = useState("");

  const { error, loading, getAllPokemon } = usePokemonService({});

  const { toast } = useToast();

  const handleSearch = async (): Promise<void> => {
    try {
      const allPokemon = await getAllPokemon();
      console.log(searchInput);
      const filteredPokemon =
        allPokemon?.filter((p: Pokemon): boolean => {
          return p.name.includes(searchInput);
        }) ?? null;
      console.log(filteredPokemon);
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
    }
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="h-full flex flex-col gap-4 items-center py-8">
      <h1 className="text-4xl bold">Pokédex</h1>
      <div className="flex gap-4">
        <Input
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
      <div className="flex flex-wrap w-full gap-4 justify-center">
        {pokemon?.map(
          (p: Pokemon, index: number): React.ReactElement => (
            <Card key={index} className="w-1/4 flex flex-col items-center">
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
    </div>
  );
}
