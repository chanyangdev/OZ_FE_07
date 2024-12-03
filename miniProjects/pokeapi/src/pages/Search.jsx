// Import necessary dependencies
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getRegExp } from "korean-regexp";
import { Card, PokemonImage, PokemonInfo } from "../styles/CardStyles";
import { typeColors } from "../styles/constants";

// Styled component for the main search container
// Provides responsive layout and consistent spacing
const SearchContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
`;

// Grid layout for displaying Pokemon cards
// Uses CSS Grid for responsive, auto-adjusting columns
const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
`;

// Styled component for displaying "no results" message
// Uses glassmorphism effect with backdrop-filter
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

// Styled search input component
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

  // Filter Pokemon based on search query using korean-regexp
  const filteredPokemons = pokemons.filter((pokemon) => {
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

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="포켓몬 이름을 검색하세요"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      {filteredPokemons.length === 0 ? (
        <NoResultsMessage>검색 결과가 없습니다.</NoResultsMessage>
      ) : (
        <PokemonGrid>
          {filteredPokemons.map((pokemon) => (
            <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
              <Card>
                <PokemonImage>
                  {/* Display Pokemon official artwork from the API */}
                  <img
                    src={
                      pokemon.sprites.other["official-artwork"].front_default
                    }
                    alt={pokemon.name}
                  />
                  {/* Show heart icon if Pokemon is in favorites */}
                  {favorites.includes(pokemon.id) && (
                    <span className="absolute top-2 right-2">❤️</span>
                  )}
                </PokemonImage>
                <PokemonInfo>
                  {/* Display Pokemon ID with leading zeros */}
                  <div className="pokemon-id">
                    #{String(pokemon.id).padStart(3, "0")}
                  </div>
                  {/* Display Pokemon name, preferring Korean if available */}
                  <h3>{pokemon.name_ko || pokemon.name}</h3>
                  {/* Display Pokemon types with corresponding colors */}
                  <div className="types">
                    {pokemon.types.map((type) => (
                      <span
                        key={type.type.name}
                        className="type-badge"
                        style={{
                          backgroundColor:
                            typeColors[type.type.name_ko] || "#777",
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
    </SearchContainer>
  );
}

export default Search;
