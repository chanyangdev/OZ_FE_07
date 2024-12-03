import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { getRegExp } from 'korean-regexp';
import { Card, PokemonImage, PokemonInfo } from "../styles/CardStyles";
import { typeColors } from "../styles/constants";

const SearchContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
`;

const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
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

function Search() {
  // Get search query from URL parameters
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  // Get Pokemon data and favorites from Redux store
  const pokemons = useSelector((state) => state.pokemon?.pokemons || []);
  const favorites = useSelector((state) => state.pokemon?.favorites || []);

  // Filter Pokemon based on search query using korean-regexp
  const filteredPokemons = pokemons.filter(pokemon => {
    // If no query, return all Pokemon
    if (!query) return true;

    // Create Korean-friendly regex
    const koreanRegex = getRegExp(query);

    // Check both Korean and English names
    return (
      (pokemon.name_ko && koreanRegex.test(pokemon.name_ko)) || 
      koreanRegex.test(pokemon.name)
    );
  });

  // Show message if no Pokemon found
  if (filteredPokemons.length === 0) {
    return (
      <SearchContainer>
        <NoResultsMessage>
          검색 결과가 없습니다.
        </NoResultsMessage>
      </SearchContainer>
    );
  }

  return (
    <SearchContainer>
      <PokemonGrid>
        {filteredPokemons.map((pokemon) => (
          // Link each card to its detail page
          <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
            <Card>
              <PokemonImage>
                {/* Display Pokemon official artwork */}
                <img
                  src={pokemon.sprites.other["official-artwork"].front_default}
                  alt={pokemon.name}
                />
                {/* Show heart icon if Pokemon is favorited */}
                {favorites.includes(pokemon.id) && (
                  <span className="absolute top-2 right-2">❤️</span>
                )}
              </PokemonImage>
              <PokemonInfo>
                {/* Display Pokemon number with padding */}
                <div className="pokemon-id">
                  #{String(pokemon.id).padStart(3, "0")}
                </div>
                <h3>{pokemon.name_ko || pokemon.name}</h3>
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