import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, PokemonImage, PokemonInfo } from "../styles/CardStyles";
import FavoriteButton from "../components/FavoriteButton";
import TypeFilter from "../components/TypeFilter";
import { useState } from "react";
import styled from 'styled-components';

const MainContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
  margin-top: 20px;
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
          <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
            <Card>
              <PokemonImage>
                <img
                  src={pokemon.sprites.other["official-artwork"].front_default}
                  alt={pokemon.name}
                />
                <FavoriteButton pokemonId={pokemon.id} />
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
      </PokemonGrid>
    </MainContainer>
  );
}

export default Main;
