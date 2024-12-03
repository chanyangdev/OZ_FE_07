import styled from 'styled-components';

export const TypeFilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 20px;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  background-color: white;
  border-radius: 0 0 15px 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 15px 10px;
    gap: 8px;
  }

  @media (max-width: 480px) {
    padding: 10px 5px;
    gap: 6px;
  }
`;

export const TypeButton = styled.button.attrs(props => ({
  'data-selected': props.$isSelected,
  'data-color': props.$typeColor,
}))`
  padding: clamp(6px, 1.5vw, 8px) clamp(12px, 2vw, 16px);
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  background-color: ${({ $isSelected, $typeColor }) => $isSelected ? $typeColor : '#e0e0e0'};
  color: ${({ $isSelected }) => $isSelected ? 'white' : '#666'};
  opacity: ${({ $isSelected }) => $isSelected ? 1 : 0.8};
  min-width: clamp(70px, 15vw, 80px);
  font-size: clamp(0.8rem, 1.5vw, 1rem);

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    min-width: auto;
    padding: 6px 10px;
    font-size: 0.8rem;
  }
`;
