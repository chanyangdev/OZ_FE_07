import { useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

export default function Main() {
  const pokemonData = useSelector((state) => state.pokemon);

  return (
    <>
      {pokemonData?.map((el) => (
        <Card key={`${el.id}-${el.name}`} pokemon={el} />
      ))}
    </>
  );
}

const CardContainer = styled.section`
  width: 150px;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
`;

const Card = ({ pokemon }) => {
  return (
    <CardContainer>
      <img src={pokemon.front} alt={pokemon.name} />
      <div>{pokemon.name}</div>
    </CardContainer>
  );
};

Card.propTypes = {
  pokemon: PropTypes.shape({
    front: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
