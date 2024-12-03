import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../RTK/slice";
import { DetailContainer, InfoSection, StatsSection } from "../styles/DetailStyles";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemon = useSelector((state) =>
    state.pokemons.find((p) => p.id === parseInt(id))
  );
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.includes(parseInt(id));

  if (!pokemon) return <div>포켓몬을 찾을 수 없습니다.</div>;

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(pokemon.id));
  };

  return (
    <DetailContainer>
      <h2 className="text-2xl font-bold mb-4">{pokemon.name}</h2>
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        className="w-[200px] h-[200px]"
      />
      <InfoSection>
        <p className="text-gray-700">{pokemon.description}</p>
        <div className="flex gap-2 mt-2">
          {pokemon.types.map((type, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded bg-gray-200 text-sm"
            >
              {type.type.name}
            </span>
          ))}
        </div>
        <button
          onClick={handleFavoriteClick}
          className={`mt-4 px-4 py-2 rounded ${
            isFavorite ? "bg-red-500" : "bg-gray-500"
          } text-white`}
        >
          {isFavorite ? "찜 취소" : "찜하기"}
        </button>
      </InfoSection>
      <StatsSection>
        <h3 className="text-xl font-bold mb-2">스탯</h3>
        {pokemon.stats.map((stat) => (
          <div key={stat.stat.name} className="flex justify-between mb-2">
            <span>{translateStatName(stat.stat.name)}:</span>
            <span>{stat.base_stat}</span>
          </div>
        ))}
      </StatsSection>
    </DetailContainer>
  );
}

function translateStatName(statName) {
  const translations = {
    "hp": "체력",
    "attack": "공격",
    "defense": "방어",
    "special-attack": "특수공격",
    "special-defense": "특수방어",
    "speed": "스피드"
  };
  return translations[statName] || statName;
}

export default Detail;
