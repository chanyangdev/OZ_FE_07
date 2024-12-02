import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CardContainer = styled(Link)`
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

const PokemonName = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: capitalize;
`;

const PokemonId = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

export const Card = ({ pokemon }) => {
  return (
    <CardContainer to={`/detail/${pokemon.id}`}>
      <img src={pokemon.front} alt={pokemon.name} />
      <PokemonId>#{pokemon.id.toString().padStart(3, '0')}</PokemonId>
      <PokemonName>{pokemon.name}</PokemonName>
    </CardContainer>
  );
};

Card.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    front: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
