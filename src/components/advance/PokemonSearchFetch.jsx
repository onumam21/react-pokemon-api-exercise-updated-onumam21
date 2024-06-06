import { useEffect, useState } from "react";

const typeColors = {
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-500",
  psychic: "bg-pink-500",
  ice: "bg-blue-200",
  dragon: "bg-purple-500",
  dark: "bg-gray-800",
  fairy: "bg-pink-300",
  normal: "bg-gray-400",
  fighting: "bg-orange-700",
  flying: "bg-indigo-300",
  poison: "bg-purple-700",
  ground: "bg-yellow-700",
  rock: "bg-yellow-900",
  bug: "bg-green-700",
  ghost: "bg-purple-900",
  steel: "bg-gray-500",
};

const PokemonSearchFetch = () => {
  const [pokemon, setPokemon] = useState(null),
    [query, setQuery] = useState(""),
    [error, setError] = useState(null),
    [suggestions, setSuggestions] = useState([]),
    [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1000"
        );
        const data = await response.json();
        setSuggestions(data.results.map((p) => p.name));
      } catch (err) {
        console.error("Failed to fetch Pokémon names:", err);
        setError("Failed to fetch Pokémon names");
      }
    };
    fetchPokemonNames();
  }, []);

  const searchPokemon = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`
      );
      if (!response.ok) throw new Error("Pokemon not found");
      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      setError("Pokemon not found");
    }
  };

  const handleInputChange = (e) => setQuery(e.target.value);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6">Pokemon Search</h1>
      <form onSubmit={searchPokemon} className="w-full max-w-sm relative">
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter Pokemon name"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
        />
        {isFocused && suggestions.length > 0 && (
          <ul className="absolute top-12 left-0 w-full bg-white border rounded shadow-md max-h-60 overflow-y-auto z-10">
            {suggestions
              .filter((name) =>
                name.toLowerCase().startsWith(query.toLowerCase())
              )
              .map((name) => (
                <li
                  key={name}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onMouseDown={() => {
                    setQuery(name);
                    setIsFocused(false);
                  }}
                >
                  {name}
                </li>
              ))}
          </ul>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Search
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {pokemon && (
        <div className="mt-6 p-4 bg-white rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 capitalize">{pokemon.name}</h2>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-32 h-32 mx-auto mb-4"
          />
          <div className="flex justify-around">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="text-center">
                <p className="font-bold">{stat.base_stat}</p>
                <p className="capitalize">{stat.stat.name}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            {pokemon.types.map((typeInfo) => (
              <span
                key={typeInfo.type.name}
                className={`px-4 py-1 rounded-full text-white ${
                  typeColors[typeInfo.type.name]
                } mx-1`}
              >
                {typeInfo.type.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonSearchFetch;