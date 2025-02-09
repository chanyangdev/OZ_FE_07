/**
 * Favorite Button Component
 * Toggles Pokemon favorite status
 * Features:
 * - Heart icon toggle
 * - Redux state management
 * - Animated interaction
 */

import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../RTK/slice";
import styled from 'styled-components';

const HeartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.8rem;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
  }

  &:focus {
    outline: none;
  }

  .heart {
    line-height: 1;
    display: block;
    transform-origin: center;
    animation: ${({ $isFavorite }) => $isFavorite ? 'pop 0.4s ease' : 'none'};
  }

  @keyframes pop {
    0% { transform: scale(1); }
    50% { transform: scale(1.3); }
    100% { transform: scale(1); }
  }
`;

function FavoriteButton({ pokemonId }) {
  const dispatch = useDispatch();
  // Check if this Pokemon is in favorites
  const isFavorite = useSelector((state) => 
    state.favorites.includes(pokemonId)
  );

  // Handle favorite toggle
  const handleClick = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    e.stopPropagation(); // Prevent event bubbling
    dispatch(toggleFavorite(pokemonId));
  };

  return (
    <HeartButton onClick={handleClick} $isFavorite={isFavorite} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 5 }}>
      <span className="heart" aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}>
        {isFavorite ? '❤️' : '🤍'}
      </span>
    </HeartButton>
  );
}

export default FavoriteButton; 