import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, PokemonImage, PokemonInfo } from "../styles/CardStyles";

function Favorite() {
  // Get all Pokemon and favorites from Redux store
  const pokemons = useSelector((state) => state.pokemons);
  const favorites = useSelector((state) => state.favorites);

  // Filter Pokemon that are in favorites
  const favoritePokemons = pokemons.filter(pokemon => 
    favorites.includes(pokemon.id)
  );

  // Show message if no favorites
  if (favoritePokemons.length === 0) {
    return (
      <div className="w-full mt-10 text-center">
        찜한 포켓몬이 없습니다.
      </div>
    );
  }

  return (
    <>
      {favoritePokemons.map((pokemon) => (
        // Link each card to its detail page
        <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
          <Card>
            <PokemonImage>
              {/* Display Pokemon official artwork */}
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
              />
              {/* Show filled heart for favorites */}
              <span className="absolute top-2 right-2">❤️</span>
            </PokemonImage>
            <PokemonInfo>
              {/* Display Pokemon number with padding */}
              <span className="text-gray-500">
                #{String(pokemon.id).padStart(3, "0")}
              </span>
              {/* Pokemon name */}
              <h3 className="font-bold">{pokemon.name}</h3>
              {/* Pokemon types */}
              <div className="flex gap-2">
                {pokemon.types.map((type, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-sm bg-gray-200 rounded"
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </PokemonInfo>
          </Card>
        </Link>
      ))}
    </>
  );
}

export default Favorite;
