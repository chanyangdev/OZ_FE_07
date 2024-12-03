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
import { useSearchParams } from "react-router-dom";
import styled from 'styled-components';
import { useState, useCallback, useEffect } from "react";
import TypeFilter from "../components/TypeFilter";
import SearchInput from "../components/shared/SearchInput";
import PokemonGrid from "../components/shared/PokemonGrid";
import { selectPokemons, selectFilteredPokemons } from '../RTK/selectors';
import { fetchMultiplePokemonById } from '../RTK/thunk';
import { filterPokemonsBySearch } from '../utils/searchUtils';

const MainContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const LoadingMessage = styled.div`
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
  const favorites = useSelector(state => state.pokemon?.favorites || []);
  const filteredPokemonsByType = useSelector(state => selectFilteredPokemons(state, selectedTypes));

  // Update URL search params when input changes
  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams.entries());
    if (searchInput) {
      setSearchParams({ ...currentParams, query: searchInput });
    } else {
      const { query, ...restParams } = currentParams;
      setSearchParams(restParams);
    }
  }, [searchInput, setSearchParams, searchParams]);

  // Filter pokemons by search
  const filteredPokemons = filterPokemonsBySearch(filteredPokemonsByType, searchInput);

  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(fetchMultiplePokemonById(151));
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
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <TypeFilter selectedTypes={selectedTypes} onTypeSelect={handleTypeSelect} />
      <PokemonGrid pokemons={filteredPokemons} favorites={favorites} />
    </MainContainer>
  );
}

export default Main;
