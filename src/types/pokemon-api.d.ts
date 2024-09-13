namespace GetAllPokemon {
  export interface Response {
    count: number;
    next: string;
    previous: string;
    results: GetAllPokemon.Result[];
  }

  export interface Result {
    name: string;
    url: string;
  }
}
