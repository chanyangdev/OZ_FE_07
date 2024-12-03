// Import necessary dependencies
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import SearchInput from "../components/shared/SearchInput";
import PokemonGrid from "../components/shared/PokemonGrid";
import { filterPokemonsBySearch } from "../utils/searchUtils";

// Styled component for the main search container
// Provides responsive layout and consistent spacing
const SearchContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
`;

/**
 * Search Component
 * Handles the search functionality and display of Pokemon cards
 * Features:
 * - Korean and English name search using korean-regexp
 * - Responsive grid layout
 * - Favorites indication
 * - URL-based search parameters
 */
function Search() {
  // Manage search params and input state
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("query") || ""
  );

  // Get Pokemon data and favorites from Redux store
  const pokemons = useSelector((state) => state.pokemon?.pokemons || []);
  const favorites = useSelector((state) => state.pokemon?.favorites || []);

  // Update URL search params when input changes
  useEffect(() => {
    if (searchInput) {
      setSearchParams({ query: searchInput });
    } else {
      setSearchParams({});
    }
  }, [searchInput, setSearchParams]);

  // Enhanced search filtering with more advanced Korean text processing
  const filteredPokemons = filterPokemonsBySearch(pokemons, searchInput);

  return (
    <SearchContainer>
      <SearchInput
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <PokemonGrid pokemons={filteredPokemons} favorites={favorites} />
    </SearchContainer>
  );
}

export default Search;
