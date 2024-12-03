import React from "react";
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

function Detail() {
  const { id } = useParams();
  const pokemon = useSelector((state) =>
    state.pokemons.find((p) => p.id === parseInt(id))
  );

  if (!pokemon) return <div>Loading...</div>;

  return (
    <DetailContainer>
      <DetailCard>
        <PokemonHeader>
          <span className="pokemon-id">#{String(pokemon.id).padStart(3, "0")}</span>
          <h2>{pokemon.name}</h2>
        </PokemonHeader>

        <FlipCard
          frontImage={pokemon.sprites.other["official-artwork"].front_default}
          backImage={pokemon.sprites.back_default || pokemon.sprites.other["official-artwork"].front_default}
        />

        <TypesContainer>
          {pokemon.types.map((type, index) => (
            <TypeBadge
              key={index}
              color={typeColors[type.type.name] || '#777'}
            >
              {type.type.name}
            </TypeBadge>
          ))}
        </TypesContainer>

        <StatsContainer>
          {pokemon.stats.map((stat, index) => (
            <StatBar
              key={index}
              color={`hsl(${(index * 60) % 360}, 70%, 50%)`}
              value={(stat.base_stat / 255) * 100}
            >
              <div className="stat-name">{stat.stat.name}</div>
              <div className="stat-bar">
                <div className="stat-fill"></div>
              </div>
            </StatBar>
          ))}
        </StatsContainer>
      </DetailCard>
    </DetailContainer>
  );
}

export default Detail;
