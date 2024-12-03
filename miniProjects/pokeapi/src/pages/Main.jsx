import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, PokemonImage, PokemonInfo } from "../styles/CardStyles";
import FavoriteButton from "../components/FavoriteButton";
import TypeFilter from "../components/TypeFilter";
import { useState } from "react";
import styled from 'styled-components';
import { typeColors } from '../styles/constants';

const MainContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 30px;
  padding: 20px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    gap: 15px;
    padding: 10px;
  }
  
  @media (min-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const CardWrapper = styled(Link)`
  display: block;
  width: 100%;
  text-decoration: none;
  aspect-ratio: 3/4;
  
  @media (max-width: 480px) {
    aspect-ratio: 1;
  }
`;

function Main() {
  const pokemons = useSelector((state) => state.pokemons);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleTypeSelect = (koreanType) => {
    setSelectedTypes(prev => {
      if (prev.includes(koreanType)) {
        return prev.filter(t => t !== koreanType);
      }
      return [...prev, koreanType];
    });
  };

  const filteredPokemons = pokemons.filter(pokemon => {
    if (selectedTypes.length === 0) return true;
    return pokemon.types.some(type => selectedTypes.includes(type.type.name));
  });

  return (
    <MainContainer>
      <TypeFilter selectedTypes={selectedTypes} onTypeSelect={handleTypeSelect} />
      <PokemonGrid>
        {filteredPokemons.map((pokemon) => (
          <CardWrapper key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
            <Card>
              <PokemonImage>
                <img
                  src={pokemon.sprites.other["official-artwork"].front_default}
                  alt={pokemon.name}
                />
                <FavoriteButton pokemonId={pokemon.id} />
              </PokemonImage>
              <PokemonInfo>
                <span className="pokemon-id">
                  #{String(pokemon.id).padStart(3, "0")}
                </span>
                <h3>{pokemon.name}</h3>
                <div className="types">
                  {pokemon.types.map((type, index) => (
                    <span
                      key={index}
                      className="type-badge"
                      style={{ backgroundColor: typeColors[type.type.name] }}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </PokemonInfo>
            </Card>
          </CardWrapper>
        ))}
      </PokemonGrid>
    </MainContainer>
  );
}

export default Main;
