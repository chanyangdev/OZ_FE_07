import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FavoriteContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
    padding: 1rem;
  }
`;

export const EmptyMessage = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 2.5rem;
  font-size: 1.2rem;
  color: #666;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const PokemonLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;
