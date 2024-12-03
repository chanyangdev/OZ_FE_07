import styled from 'styled-components';

export const TypeFilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 20px;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  border-radius: 0 0 15px 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const TypeButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  background-color: ${({ isSelected, typeColor }) => isSelected ? typeColor : '#e0e0e0'};
  color: ${({ isSelected }) => isSelected ? 'white' : '#666'};
  opacity: ${({ isSelected }) => isSelected ? 1 : 0.8};
  min-width: 80px;

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const typeColors = {
  '노말': '#A8A878',
  '불꽃': '#F08030',
  '물': '#6890F0',
  '전기': '#F8D030',
  '풀': '#78C850',
  '얼음': '#98D8D8',
  '격투': '#C03028',
  '독': '#A040A0',
  '땅': '#E0C068',
  '비행': '#A890F0',
  '에스퍼': '#F85888',
  '벌레': '#A8B820',
  '바위': '#B8A038',
  '고스트': '#705898',
  '드래곤': '#7038F8',
  '악': '#705848',
  '강철': '#B8B8D0',
  '페어리': '#EE99AC'
};
