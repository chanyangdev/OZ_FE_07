import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card, PokemonImage, PokemonInfo } from "../../styles/CardStyles";
import { typeColors } from "../../styles/constants";
import FavoriteButton from "../FavoriteButton";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 20px;
  padding: 20px;
  margin-top: 20px;
  
  @media (min-width: 1600px) {
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
    max-width: 1600px;
    margin: 20px auto;
    gap: 24px;
  }

  @media (max-width: 1200px) {
    gap: 16px;
    padding: 16px;
  }

  @media (max-width: 768px) {
    gap: 12px;
    padding: 12px;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
  }
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: 48px;
  font-size: 1.2rem;
  color: #666;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  margin: 24px auto;
  max-width: 400px;
`;

const PokemonGrid = ({ pokemons, favorites = [] }) => {
  if (pokemons.length === 0) {
    return <NoResultsMessage>검색 결과가 없습니다.</NoResultsMessage>;
  }

  return (
    <GridContainer>
      {pokemons.map((pokemon) => (
        <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
          <Card>
            <FavoriteButton pokemonId={pokemon.id} />
            <PokemonImage>
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
              />
            </PokemonImage>
            <PokemonInfo>
              <div className="pokemon-id">
                #{String(pokemon.id).padStart(3, "0")}
              </div>
              <h3>{pokemon.name_ko || pokemon.name}</h3>
              <div className="types">
                {pokemon.types.map((type) => {
                  console.log('Type object:', type);
                  console.log('Type name Korean:', type.type.name_ko);
                  console.log('Available colors:', typeColors);
                  
                  const typeNameKo = type.type.name_ko;
                  const typeColor = typeColors[typeNameKo];
                  
                  console.log('Selected color:', typeColor);
                  
                  return (
                    <span
                      key={type.type.name}
                      className="type-badge"
                      style={{
                        backgroundColor: typeColor || "#777"
                      }}
                    >
                      {typeNameKo || type.type.name}
                    </span>
                  );
                })}
              </div>
            </PokemonInfo>
          </Card>
        </Link>
      ))}
    </GridContainer>
  );
};

export default PokemonGrid;
