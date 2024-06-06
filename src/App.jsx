import PokemonBasicFetch from "./components/basic/PokemonBasicFetch";
import PokemonFetch from "./components/PokemonFetch";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <PokemonBasicFetch />
      <PokemonFetch />
    </div>
  );
}

export default App;
