import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

function App(): React.ReactElement {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center">
        <div className="absolute right-8 top-8">
          <ModeToggle />
        </div>
        <h1>Welcome to the Pokedex!</h1>
      </div>
    </ThemeProvider>
  );
}

export default App;
