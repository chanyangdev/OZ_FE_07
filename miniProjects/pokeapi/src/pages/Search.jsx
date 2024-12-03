// Import necessary dependencies
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { getRegExp } from 'korean-regexp';
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
  // Get search query from URL parameters using React Router's useSearchParams
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  // Get Pokemon data and favorites from Redux store
  // Uses useSelector hook to access the global state
  const pokemons = useSelector((state) => state.pokemon?.pokemons || []);
  const favorites = useSelector((state) => state.pokemon?.favorites || []);

  // Filter Pokemon based on search query using korean-regexp
  // Supports both Korean and English name searches
  const filteredPokemons = pokemons.filter(pokemon => {
    // If no query, return all Pokemon
    if (!query) return true;

    // Create Korean-friendly regex using korean-regexp library
    // This handles Korean character variations and partial matches
    const koreanRegex = getRegExp(query);

    // Check both Korean and English names for matches
    return (
      (pokemon.name_ko && koreanRegex.test(pokemon.name_ko)) || 
      koreanRegex.test(pokemon.name)
    );
  });

  // Display message when no Pokemon match the search criteria
  if (filteredPokemons.length === 0) {
    return (
      <SearchContainer>
        <NoResultsMessage>
          검색 결과가 없습니다.
        </NoResultsMessage>
      </SearchContainer>
    );
  }

  // Render the main search results
  return (
    <SearchContainer>
      <PokemonGrid>
        {filteredPokemons.map((pokemon) => (
          // Link each card to its detail page using React Router
          <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
            <Card>
              <PokemonImage>
                {/* Display Pokemon official artwork from the API */}
                <img
                  src={pokemon.sprites.other["official-artwork"].front_default}
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
                        backgroundColor: typeColors[type.type.name_ko] || '#777',
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
    </SearchContainer>
  );
}

export default Search;