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
  const pokemons = useSelector((state) => state.pokemon?.pokemons || []);
  const favorites = useSelector((state) => state.pokemon?.favorites || []);

  const favoritePokemons = pokemons.filter(pokemon => 
    favorites.includes(pokemon.id)
  );

  if (pokemons.length === 0) {
    return <EmptyMessage>Loading...</EmptyMessage>;
  }

  if (favoritePokemons.length === 0) {
    return (
      <EmptyMessage>
        찜한 포켓몬이 없습니다.
      </EmptyMessage>
    );
  }

  return (
    <FavoriteContainer>
      {favoritePokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon}>
          <FavoriteButton pokemonId={pokemon.id} />
        </PokemonCard>
      ))}
    </FavoriteContainer>
  );
}

export default Favorite;
