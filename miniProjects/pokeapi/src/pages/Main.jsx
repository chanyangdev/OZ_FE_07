import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, PokemonImage, PokemonInfo } from "../styles/CardStyles";

function Main() {
  const pokemons = useSelector((state) => state.pokemons);
  const favorites = useSelector((state) => state.favorites);

  return (
    <>
      {pokemons.map((pokemon) => (
        <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
          <Card>
            <PokemonImage>
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
              />
              {favorites.includes(pokemon.id) && (
                <span className="absolute top-2 right-2">❤️</span>
              )}
            </PokemonImage>
            <PokemonInfo>
              <span className="text-gray-500">
                #{String(pokemon.id).padStart(3, "0")}
              </span>
              <h3 className="font-bold">{pokemon.name}</h3>
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

export default Main;
