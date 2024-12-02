import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const PokemonName = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-transform: capitalize;
  margin: 0;
`;

const PokemonId = styled.div`
  font-size: 1.2rem;
  color: #666;
`;

const Description = styled.p`
  text-align: center;
  line-height: 1.6;
  color: #444;
  max-width: 600px;
  font-size: 1.1rem;
`;

const PokemonImage = styled.img`
  width: 250px;
  height: 250px;
  image-rendering: pixelated;
`;

const TypesContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Type = styled.span`
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  text-transform: capitalize;
  background-color: #eee;
`;

const Stats = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
`;

const Stat = styled.div`
  text-align: center;

  span {
    color: #666;
    font-size: 0.9rem;
  }
`;

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
