import PokemonBasicFetch from "./components/basic/PokemonBasicFetch";
import PokemonFetch from "./components/PokemonFetch";
import PokemonSearchFetch from "./components/advance/PokemonSearchFetch";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 rounded-full">
      <PokemonBasicFetch />
      <PokemonFetch />
      <PokemonSearchFetch />
    </div>
  );
}

export default App;
