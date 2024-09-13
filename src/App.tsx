import { Button } from "@/components/ui/button";

function App(): React.ReactElement {
  return (
    <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center">
      <h1>Welcome to the Pokedex!</h1>
      <Button onClick={() => alert("hello!")}>Click me!</Button>
    </div>
  );
}

export default App;
