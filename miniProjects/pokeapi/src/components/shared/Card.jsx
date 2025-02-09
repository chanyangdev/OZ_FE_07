import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, PokemonImage, PokemonInfo } from "../../styles/CardStyles";
import FavoriteButton from "../FavoriteButton";
import { typeColors, englishTypeColors } from "../../styles/constants";
import styled from "styled-components";

const LoadingPlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  color: #666;
  font-size: 0.9rem;
  
  &::after {
    content: "";
    width: 20px;
    height: 20px;
    border: 2px solid #ff5350;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-left: 8px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const CardContainer = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  
  &:hover {
    .favorite-button {
      opacity: 1;
    }
  }
`;

const StyledFavoriteButton = styled(FavoriteButton)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const PokemonCard = memo(({ pokemon, children }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  if (!pokemon) return null;

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = (e) => {
    console.error("Failed to load pokemon image:", pokemon.name);
    setIsImageLoading(false);
    e.target.src = "/placeholder.png";
  };

  const getTypeColor = (typeName) => {
    // Try Korean color first, then English color
    return typeColors[typeName] || englishTypeColors[typeName] || '#666666';
  };

  return (
    <CardContainer to={`/pokemon/${pokemon.id}`}>
      <Card>
        {children || (
          <StyledFavoriteButton 
            pokemonId={pokemon.id} 
            className="favorite-button"
          />
        )}
        <PokemonImage>
          {isImageLoading && <LoadingPlaceholder>Loading...</LoadingPlaceholder>}
          <img
            src={pokemon.sprites.other?.["official-artwork"]?.front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
            style={{ display: isImageLoading ? "none" : "block" }}
            onLoad={handleImageLoad}
            onError={handleImageError}
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
                style={{ backgroundColor: getTypeColor(type.type.name) }}
              >
                {type.type.name_ko || type.type.name}
              </span>
            ))}
          </div>
        </PokemonInfo>
      </Card>
    </CardContainer>
  );
});

PokemonCard.displayName = "PokemonCard";

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    name_ko: PropTypes.string,
    sprites: PropTypes.shape({
      front_default: PropTypes.string.isRequired,
      other: PropTypes.shape({
        "official-artwork": PropTypes.shape({
          front_default: PropTypes.string,
        }),
      }),
    }).isRequired,
    types: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.shape({
          name: PropTypes.string.isRequired,
          name_ko: PropTypes.string,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
  children: PropTypes.node,
};

export default PokemonCard;
