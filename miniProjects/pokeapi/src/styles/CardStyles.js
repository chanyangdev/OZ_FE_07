import styled from "styled-components";
import { Link } from "react-router-dom";

export const CardContainer = styled(Link)`
  width: 200px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  background: white;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }

  img {
    width: 120px;
    height: 120px;
    image-rendering: pixelated;
  }
`;

export const PokemonName = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: capitalize;
`;

export const PokemonId = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

// ... rest of Card styles 