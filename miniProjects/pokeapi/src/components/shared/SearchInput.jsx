import styled from 'styled-components';

const StyledSearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
  }

  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 0.9rem;
  }
`;

const SearchInput = ({ value, onChange, placeholder = "포켓몬 이름을 검색하세요" }) => (
  <StyledSearchInput
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export default SearchInput;
