import styled from "styled-components";

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const PokemonName = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-transform: capitalize;
  margin: 0;
`;

export const PokemonId = styled.div`
  font-size: 1.2rem;
  color: #666;
`;

export const Description = styled.p`
  text-align: center;
  line-height: 1.6;
  color: #444;
  max-width: 600px;
  font-size: 1.1rem;
`;

export const PokemonImage = styled.img`
  width: 250px;
  height: 250px;
  image-rendering: pixelated;
`;

export const TypesContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const Type = styled.span`
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  text-transform: capitalize;
  background-color: #eee;
`;

export const Stats = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
`;

export const Stat = styled.div`
  text-align: center;

  span {
    color: #666;
    font-size: 0.9rem;
  }
`;
