import { useEffect, useState } from "react";

export interface PokemonServiceProps {}

export interface PokemonServiceHookResult {
  error: Error | null;
  loading: boolean;
  getAllPokemon: () => Promise<Pokemon[] | null>;
}

export default function usePokemonService({}: PokemonServiceProps): PokemonServiceHookResult {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllPokemon = async (): Promise<Pokemon[] | null> => {
    setLoading(true);
    try {
      const url = "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0";
      const response: GetAllPokemon.Response = await (await fetch(url)).json();
      const pokemon: Pokemon[] = response.results.map((r) => {
        const name = r.name;
        const urlParts = r.url.split("/");
        const idAsString = urlParts[urlParts.length - 2];
        const idAsNumber: number = +idAsString;
        const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idAsNumber}.png`;
        return {
          id: idAsNumber,
          name,
          spriteUrl,
        };
      });
      return pokemon;
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }

    return null;
  };

  return {
    error,
    loading,
    getAllPokemon,
  };
}
