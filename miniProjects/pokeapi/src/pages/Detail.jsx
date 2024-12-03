import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import FlipCard from "../components/FlipCard";
import {
  DetailContainer,
  DetailCard,
  PokemonHeader,
  TypesContainer,
  TypeBadge,
  StatsContainer,
  StatBar
} from "../styles/DetailStyles";
import { typeColors } from "../styles/constants";

// Mapping of stat names to more readable labels
const statLabels = {
  'hp': 'HP',
  'attack': 'Attack',
  'defense': 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  'speed': 'Speed'
};

// Color gradient for stat bars
const getStatColor = (statName) => {
  const statColorMap = {
    'hp': '#FF5959',
    'attack': '#F5AC78',
    'defense': '#FAE078',
    'special-attack': '#9DB7F5',
    'special-defense': '#A7DB8D',
    'speed': '#FA92B2'
  };
  return statColorMap[statName] || '#777';
};

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
      <DetailCard>
        <PokemonHeader>
          <span className="pokemon-id">#{String(pokemon.id).padStart(3, "0")}</span>
          <h2>{pokemon.name_ko || pokemon.name}</h2>
        </PokemonHeader>

        <FlipCard
          frontImage={pokemon.sprites.other["official-artwork"].front_default}
          backImage={pokemon.sprites.back_default || pokemon.sprites.other["official-artwork"].front_default}
        />

        <TypesContainer>
          {pokemon.types.map((type, index) => {
            // Ensure we're using the correct Korean type name
            const koreanTypeName = type.type.name_ko || type.type.name;
            const typeColor = typeColors[koreanTypeName] || '#777';

            return (
              <TypeBadge
                key={index}
                color={typeColor}
              >
                {koreanTypeName}
              </TypeBadge>
            );
          })}
        </TypesContainer>

        <StatsContainer>
          <h3>Base Stats</h3>
          {pokemon.stats.map((stat, index) => (
            <StatBar
              key={index}
              color={getStatColor(stat.stat.name)}
              value={(stat.base_stat / 255) * 100} // Normalize to 0-100%
            >
              <div className="stat-name">
                {statLabels[stat.stat.name] || stat.stat.name}
              </div>
              <div className="stat-bar">
                <div 
                  className="stat-fill" 
                  style={{ 
                    width: `${(stat.base_stat / 255) * 100}%`,
                    backgroundColor: getStatColor(stat.stat.name)
                  }}
                ></div>
              </div>
              <div className="stat-value">{stat.base_stat}</div>
            </StatBar>
          ))}
        </StatsContainer>
      </DetailCard>
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
