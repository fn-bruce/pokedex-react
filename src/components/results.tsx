import Item from "./item";

interface ResultsProps {
  pokemon: Pokemon[] | null;
  currentPage: number;
  pageSize: number;
}

const Results = ({
  pokemon,
  currentPage,
  pageSize,
}: ResultsProps): React.ReactElement => {
  return (
    <div className="h-[790px] ">
      <div className="h-full w-[790px] flex flex-wrap gap-4 justify-center items-center">
        {pokemon && pokemon.length === 0 && <div>No results</div>}
        {pokemon
          ?.slice(
            (currentPage - 1) * pageSize,
            (currentPage - 1) * pageSize + pageSize,
          )
          .map(
            (p: Pokemon, i: number): React.ReactElement => (
              <Item key={i} id={p.id} name={p.name} spriteUrl={p.spriteUrl} />
            ),
          )}
      </div>
    </div>
  );
};

export default Results;
