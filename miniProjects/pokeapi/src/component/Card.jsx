import PropTypes from "prop-types";
import { CardContainer, PokemonName, PokemonId } from "../styles/CardStyles";

export const Card = ({ pokemon }) => {
  return (
    <CardContainer to={`/detail/${pokemon.id}`}>
      <img src={pokemon.front} alt={pokemon.name} />
      <PokemonId>#{pokemon.id.toString().padStart(3, "0")}</PokemonId>
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
