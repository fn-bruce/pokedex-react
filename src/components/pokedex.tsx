import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import usePokemonService from "@/hooks/use-pokemon-service";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function Pokedex(): React.ReactElement {
  const [allPokemon, setAllPokemon] = useState<Pokemon[] | null>(null);
  const { error, loading, getAllPokemon } = usePokemonService({});

  const { toast } = useToast();

  useEffect((): void => {
    getAllPokemon()
      .then((p: Pokemon[] | null): void => {
        setAllPokemon(p);
        toast({
          description: "Successfully fetched all pokemon",
          duration: 3000,
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: error?.message,
          duration: 3000,
          variant: "destructive",
        });
      });
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col gap-4 items-center mt-8">
      <h1 className="text-4xl bold">Pokédex</h1>
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <LoaderCircle className="animate-spin w-36 h-36" />
        </div>
      )}
      <div className="flex flex-wrap gap-4 m-4 justify-center">
        {allPokemon?.map(
          (p: Pokemon, index: number): React.ReactElement => (
            <Card
              key={index}
              className="w-full sm:w-1/4 flex flex-col items-center"
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
    </div>
  );
}
