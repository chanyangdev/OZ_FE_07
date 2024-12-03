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
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 5;
  
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
  const isFavorite = useSelector((state) => 
    state.pokemon?.favorites?.includes(pokemonId) || false
  );

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(pokemonId));
  };

  return (
    <HeartButton onClick={handleClick} $isFavorite={isFavorite}>
      <span className="heart" aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}>
        {isFavorite ? '❤️' : '🤍'}
      </span>
    </HeartButton>
  );
}

export default FavoriteButton;