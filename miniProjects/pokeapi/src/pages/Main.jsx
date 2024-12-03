import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Card, PokemonImage, PokemonInfo } from "../styles/CardStyles";
import FavoriteButton from "../components/FavoriteButton";
import TypeFilter from "../components/TypeFilter";
import { useState, useCallback, useEffect } from "react";
import styled from 'styled-components';
import { typeColors } from '../styles/constants';
import { selectPokemons, selectFilteredPokemons } from '../RTK/selectors';
import { fetchMultiplePokemonById } from '../RTK/thunk';

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
`;

const CardWrapper = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

function Main() {
  const dispatch = useDispatch();
  const [selectedTypes, setSelectedTypes] = useState([]);
  const pokemons = useSelector(selectPokemons);
  const filteredPokemons = useSelector(state => selectFilteredPokemons(state, selectedTypes));

  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(fetchMultiplePokemonById(151)); // Fetch first 151 Pokemon
    }
  }, [dispatch, pokemons.length]);

  const handleTypeSelect = useCallback((koreanType) => {
    setSelectedTypes(prev => {
      if (prev.includes(koreanType)) {
        return prev.filter(t => t !== koreanType);
      }
      return [...prev, koreanType];
    });
  }, []);

  if (pokemons.length === 0) {
    return (
      <MainContainer>
        <LoadingMessage>Loading...</LoadingMessage>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <TypeFilter selectedTypes={selectedTypes} onTypeSelect={handleTypeSelect} />
      <PokemonGrid>
        {filteredPokemons.map((pokemon) => (
          <CardWrapper key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
            <Card>
              <FavoriteButton pokemonId={pokemon.id} />
              <PokemonImage>
                <img
                  src={pokemon.sprites.other["official-artwork"].front_default}
                  alt={pokemon.name}
                />
              </PokemonImage>
              <PokemonInfo>
                <div className="pokemon-id">#{String(pokemon.id).padStart(3, "0")}</div>
                <h3>{pokemon.name_ko || pokemon.name}</h3>
                <div className="types">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className="type-badge"
                      style={{
                        backgroundColor: typeColors[type.type.name],
                      }}
                    >
                      {type.type.name_ko || type.type.name}
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
