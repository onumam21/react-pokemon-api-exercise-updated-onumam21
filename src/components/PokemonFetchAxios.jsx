// import useEffect and useState
import axios from "axios";
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

const PokemonFetchAxios = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        // Fetch initial list of Pokémon
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=3"
        );
        const data = await response.data;

        // Sequentially fetch details for each Pokémon
        const pokemonData = [];
        console.log(data.results);
        for (const pokemon of data.results) {
          const res = await fetch(pokemon.url);
          const pokemonDetails = await res.json();
          pokemonData.push(pokemonDetails);
        }

        // Update the state with the detailed Pokémon data
        setPokemonList(pokemonData);
      } catch (error) {
        console.error("Failed to fetch Pokémon:", error);
      }
    };

    fetchAllPokemon();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6">Pokemon List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        {pokemonList.map((pokemon) => (
          <div key={pokemon.id} className="bg-white rounded shadow-md p-4">
            <h2 className="text-xl font-bold mb-2 capitalize">
              {pokemon.name}
              {/* {console.log(pokemon)} */}
            </h2>
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-32 h-32 mx-auto mb-2"
            />
            <div className="flex justify-center">
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
        ))}
      </div>
    </div>
  );
};

export default PokemonFetchAxios;
