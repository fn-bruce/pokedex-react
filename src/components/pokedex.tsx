import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TEST_DATA: Pokemon[] = [
  {
    id: 1,
    name: "Bulbasaur",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
  {
    id: 2,
    name: "Ivysaur",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
  },
  {
    id: 3,
    name: "Venusaur",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
  },
  {
    id: 4,
    name: "Charmander",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
  },
  {
    id: 5,
    name: "Charmeleon",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
  },
  {
    id: 6,
    name: "Charizard",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
  },
  {
    id: 7,
    name: "Squirtle",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
  },
  {
    id: 8,
    name: "Wartortle",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
  },
  {
    id: 9,
    name: "Blastoise",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
  },
];

export function Pokedex(): React.ReactElement {
  const [pokemonList, setPokemonList] = useState<Pokemon[] | null>(TEST_DATA);

  return (
    <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center">
      <h1>Welcome to the Pokedex!</h1>
      <div className="flex flex-wrap gap-4 m-4 justify-center">
        {!pokemonList && <div>Nothing found</div>}
        {pokemonList?.map((p) => (
          <Card className="w-full sm:w-1/4 flex flex-col items-center">
            <CardHeader>
              <CardTitle>{p.name}</CardTitle>
              <CardDescription className="text-center">#{p.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <img src={p.sprite} alt={p.name} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
