import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import { CardContainer, PokemonName, PokemonId } from "../styles/CardStyles";
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

const Card = memo(({ pokemon }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Skip rendering if pokemon data is not available
  if (!pokemon) return null;

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = (e) => {
    console.error("Failed to load pokemon image:", pokemon.name);
    setIsImageLoading(false);
    e.target.src = "/placeholder.png"; // Add a placeholder image
  };

  return (
    <CardContainer to={`/detail/${pokemon.id}`}>
      <LoadingPlaceholder style={{ display: isImageLoading ? "block" : "none" }}>Loading...</LoadingPlaceholder>
      <img
        src={pokemon.front}
        alt={pokemon.name}
        style={{ display: isImageLoading ? "none" : "block" }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      <PokemonId>#{pokemon.id.toString().padStart(3, "0")}</PokemonId>
      <PokemonName>{pokemon.name}</PokemonName>
    </CardContainer>
  );
});

Card.displayName = "Card";

Card.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    front: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
