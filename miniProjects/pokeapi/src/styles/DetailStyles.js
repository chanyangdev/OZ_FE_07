import styled from "styled-components";

export const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

export const DetailCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
`;

export const PokemonHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h2 {
    font-size: 2.5rem;
    color: #333;
    margin: 10px 0;
  }

  .pokemon-id {
    color: #666;
    font-size: 1.2rem;
  }
`;

export const TypesContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
`;

export const TypeBadge = styled.span`
  padding: 8px 20px;
  border-radius: 25px;
  color: white;
  font-weight: 500;
  font-size: 1.1rem;
  background-color: ${props => props.color};
`;

export const StatsContainer = styled.div`
  margin-top: 30px;
`;

export const StatBar = styled.div`
  margin: 15px 0;

  .stat-name {
    font-weight: 500;
    margin-bottom: 5px;
  }

  .stat-bar {
    height: 10px;
    background: #f0f0f0;
    border-radius: 5px;
    overflow: hidden;

    .stat-fill {
      height: 100%;
      background: ${props => props.color};
      width: ${props => props.value}%;
      transition: width 1s ease-out;
    }
  }
`;
