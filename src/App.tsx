import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { Pokedex } from "./components/pokedex";
import { Toaster } from "./components/ui/toaster";

function App(): React.ReactElement {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="absolute right-8 top-8">
        <ModeToggle />
      </div>
      <Pokedex />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
