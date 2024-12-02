import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  DetailContainer,
  PokemonName,
  PokemonId,
  Description,
  PokemonImage,
  TypesContainer,
  Type,
  Stats,
  Stat
} from "../styles/DetailStyles";

export default function Detail() {
  const { pokemonId } = useParams();
  const pokemonData = useSelector((state) => {
    return state.data?.find((p) => p.id === Number(pokemonId));
  });

  if (!pokemonData) {
    return <div>Loading... ID: {pokemonId}</div>;
  }

  return (
    <DetailContainer>
      <PokemonId>#{pokemonData.id.toString().padStart(3, "0")}</PokemonId>
      <PokemonName>{pokemonData.name}</PokemonName>
      <PokemonImage src={pokemonData.front} alt={pokemonData.name} />
      <TypesContainer>
        {pokemonData.types?.map((type) => (
          <Type key={type}>{type}</Type>
        ))}
      </TypesContainer>
      <Stats>
        <Stat>
          <div>{pokemonData.height / 10}m</div>
          <span>Height</span>
        </Stat>
        <Stat>
          <div>{pokemonData.weight / 10}kg</div>
          <span>Weight</span>
        </Stat>
      </Stats>
      {pokemonData.description && (
        <Description>{pokemonData.description}</Description>
      )}
    </DetailContainer>
  );
}
