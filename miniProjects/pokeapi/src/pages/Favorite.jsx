/**
 * Favorite Pokemon Page
 * Displays a collection of user's favorite Pokemon
 * Features:
 * - Grid view of favorited Pokemon
 * - Ability to remove favorites
 * - Responsive layout
 */

import { useSelector } from "react-redux";
import { Card, PokemonImage, PokemonInfo } from "../styles/CardStyles";
import { FavoriteContainer, EmptyMessage, PokemonLink } from "../styles/FavoriteStyles";
import FavoriteButton from "../components/FavoriteButton";
import { typeColors } from "../styles/constants";

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
        <PokemonLink key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
          <Card>
            <FavoriteButton pokemonId={pokemon.id} />
            <PokemonImage>
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
              />
            </PokemonImage>
            <PokemonInfo>
              <div className="pokemon-id">#{String(pokemon.id).padStart(3, "0")}</div>
              <h3>{pokemon.name_ko || pokemon.name}</h3>
              <div className="types">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className="type-badge"
                    style={{
                      backgroundColor: typeColors[type.type.name],
                    }}
                  >
                    {type.type.name_ko || type.type.name}
                  </span>
                ))}
              </div>
            </PokemonInfo>
          </Card>
        </PokemonLink>
      ))}
    </FavoriteContainer>
  );
}

export default Favorite;
