import styled from "styled-components";

export const DetailContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
  min-height: 100vh;
`;

export const DetailCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const PokemonHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h2 {
    font-size: 2.5rem;
    color: #333;
    margin: 10px 0;
    text-transform: capitalize;
  }

  .pokemon-id {
    color: #666;
    font-size: 1.2rem;
  }
`;

export const TypesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const StatsContainer = styled.div`
  margin-top: 30px;

  h3 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
    font-size: 1.4rem;
  }
`;

export const StatBar = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
  gap: 15px;

  .stat-name {
    flex: 0 0 100px;
    font-weight: 500;
    color: #555;
    text-align: right;
    padding-right: 15px;
    font-size: 0.9rem;
  }

  .stat-bar {
    flex: 1;
    height: 15px;
    background: #f0f0f0;
    border-radius: 10px;
    overflow: hidden;
    position: relative;

    .stat-fill {
      height: 100%;
      border-radius: 10px;
      transition: width 1s ease-out;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }

  .stat-value {
    flex: 0 0 40px;
    font-weight: 500;
    color: #333;
    text-align: left;
    font-size: 0.9rem;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

    .stat-name {
      text-align: left;
      padding-right: 0;
      margin-bottom: 5px;
    }

    .stat-bar {
      width: 100%;
    }

    .stat-value {
      margin-top: 5px;
    }
  }
`;
