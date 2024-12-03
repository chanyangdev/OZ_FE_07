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
    state.pokemon?.pokemons?.find((p) => p.id === parseInt(id))
  );

  if (!pokemon) return <div>Loading...</div>;

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
          {pokemon.types.map((type, index) => (
            <TypeBadge
              key={index}
              color={typeColors[type.type.name] || '#777'}
            >
              {type.type.name_ko || type.type.name}
            </TypeBadge>
          ))}
        </TypesContainer>

        <StatsContainer>
          {pokemon.stats.map((stat, index) => (
            <StatBar
              key={index}
              label={stat.stat.name}
              value={stat.base_stat}
              max={255}
            />
          ))}
        </StatsContainer>
      </DetailCard>
    </DetailContainer>
  );
}

export default Detail;
