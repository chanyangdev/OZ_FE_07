/**
 * Card Styles Module
 * Provides styled components for Pokemon card rendering
 * Features:
 * - Responsive card layout
 * - Consistent design system
 * - Flexbox and grid-based styling
 * - Hover and interaction effects
 */

import styled from 'styled-components';

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
    filter: drop-shadow(0 0 6px rgba(0,0,0,0.2));
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    z-index: 1;
  }

  @media (min-width: 1600px) {
    max-width: 280px;
    margin: 0 auto;
  }

  @media (max-width: 1200px) {
    padding: 10px;
  }

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const PokemonImage = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  img {
    width: 150px;
    height: 150px;
    object-fit: contain;
  }
`;

export const PokemonInfo = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
