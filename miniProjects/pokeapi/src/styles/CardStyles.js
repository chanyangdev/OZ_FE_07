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
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 10px rgba(0,0,0,0.5));
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

  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const PokemonImage = styled.div`
  position: relative;
  width: 100%;
  padding-top: 75%; 
  margin-bottom: 10px;
  flex: 0 0 auto; 

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }

  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

export const PokemonInfo = styled.div`
  text-align: center;
  padding: 10px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 25%;

  h3 {
    margin: 5px 0;
    font-size: clamp(1rem, 2vw, 1.3rem);
    color: #333;
    font-weight: bold;
  }

  .types {
    display: flex;
    gap: 6px;
    justify-content: center;
    margin-top: 8px;
    flex-wrap: wrap;
    padding: 0 5px;
  }

  .type-badge {
    padding: 4px 10px;
    border-radius: 20px;
    font-size: clamp(0.7rem, 1.2vw, 0.85rem);
    color: white;
    font-weight: 500;
    white-space: nowrap;
    min-width: 55px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .pokemon-id {
    color: #666;
    font-size: clamp(0.8rem, 1.5vw, 1rem);
    margin-bottom: 5px;
  }

  @media (max-width: 768px) {
    padding: 8px 0;
    
    .types {
      gap: 5px;
    }
    
    .type-badge {
      padding: 3px 8px;
      min-width: 45px;
    }
  }

  @media (max-width: 480px) {
    padding: 5px 0;
    
    h3 {
      margin: 3px 0;
    }
    
    .types {
      margin-top: 5px;
      gap: 4px;
    }
    
    .type-badge {
      padding: 2px 6px;
      min-width: 40px;
    }
  }
`;
