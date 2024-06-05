import PokemonBasicFetch from "./components/PokemonBasicFetch";
// import PokemonFetch from "./components/PokemonFetch";
// import PokemonSearchFetch from "./components/PokemonSearchFetch";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <PokemonBasicFetch />
      {/* <PokemonFetch /> */}
      {/* <PokemonSearchFetch /> */}
    </div>
  );
};

export default App;
