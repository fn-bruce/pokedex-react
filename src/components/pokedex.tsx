import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import usePokemonService from "@/hooks/usePokemonService";
import { useEffect, useState } from "react";

export function Pokedex(): React.ReactElement {
  const [pokemon, setPokemon] = useState<Pokemon[] | null>(null);
  const { error, loading, getAllPokemon } = usePokemonService({});

  useEffect((): void => {
    getAllPokemon().then((p: Pokemon[] | null): void => {
      setPokemon(p);
    });
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col gap-4 items-center mt-8">
      <h1 className="text-4xl bold">Pokédex</h1>
      <div className="flex flex-wrap gap-4 m-4 justify-center">
        {pokemon?.map(
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
