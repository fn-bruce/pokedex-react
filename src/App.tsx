import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { Pokedex } from "./components/pokedex";

function App(): React.ReactElement {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="absolute right-8 top-8">
        <ModeToggle />
      </div>
      <Pokedex />
    </ThemeProvider>
  );
}

export default App;
