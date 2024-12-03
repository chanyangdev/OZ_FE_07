/**
 * Main Pokemon Listing Page
 * Displays a comprehensive list of Pokemon
 * Features:
 * - Infinite scroll
 * - Pokemon grid view
 * - Basic filtering and sorting
 * - Performance optimized rendering
 * - Advanced search functionality with URL-based search and korean-regexp
 */

import { useSelector, useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { Card, PokemonImage, PokemonInfo } from "../styles/CardStyles";
import FavoriteButton from "../components/FavoriteButton";
import TypeFilter from "../components/TypeFilter";
import { useState, useCallback, useEffect } from "react";
import styled from 'styled-components';
import { getRegExp } from 'korean-regexp';
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

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
  }

  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 0.9rem;
  }
`;

const PokemonGrid = styled.div`
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

function Main() {
  const dispatch = useDispatch();
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get("query") || "");

  const pokemons = useSelector(selectPokemons);
  const filteredPokemonsByType = useSelector(state => selectFilteredPokemons(state, selectedTypes));

  // Update URL search params when input changes
  useEffect(() => {
    if (searchInput) {
      setSearchParams({ query: searchInput });
    } else {
      setSearchParams({});
    }
  }, [searchInput, setSearchParams]);

  // Filter Pokemon based on search query and types
  const filteredPokemons = filteredPokemonsByType.filter(pokemon => {
    // If no query, return all Pokemon
    if (!searchInput) return true;

    // Create Korean-friendly regex using korean-regexp library
    const koreanRegex = getRegExp(searchInput.toLowerCase());

    // Check both Korean and English names for matches
    return (
      (pokemon.name_ko && koreanRegex.test(pokemon.name_ko.toLowerCase())) || 
      koreanRegex.test(pokemon.name.toLowerCase())
    );
  });

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
      <SearchInput 
        type="text" 
        placeholder="포켓몬 이름을 검색하세요 (한글/영어)"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <TypeFilter selectedTypes={selectedTypes} onTypeSelect={handleTypeSelect} />
      
      {filteredPokemons.length === 0 ? (
        <NoResultsMessage>
          검색 결과가 없습니다.
        </NoResultsMessage>
      ) : (
        <PokemonGrid>
          {filteredPokemons.map((pokemon) => (
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
            </Link>
          ))}
        </PokemonGrid>
      )}
    </MainContainer>
  );
}

export default Main;
