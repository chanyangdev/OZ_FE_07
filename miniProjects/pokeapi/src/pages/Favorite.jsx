/**
 * Favorite Pokemon Page
 * Displays a collection of user's favorite Pokemon
 * Features:
 * - Grid view of favorited Pokemon
 * - Ability to remove favorites
 * - Responsive layout
 */

import { useSelector } from "react-redux";
import { EmptyMessage, FavoriteContainer } from "../styles/FavoriteStyles";
import PokemonCard from "../components/shared/Card";
import FavoriteButton from "../components/FavoriteButton";

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
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </>
  );
}

export default Favorite;
