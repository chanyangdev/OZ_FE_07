import React from 'react';
import { TypeFilterContainer, TypeButton } from '../styles/TypeFilterStyles';
import { typeColors } from '../styles/constants';

function TypeFilter({ selectedTypes, onTypeSelect }) {
  return (
    <TypeFilterContainer>
      {Object.keys(typeColors).map((type) => (
        <TypeButton
          key={type}
          $isSelected={selectedTypes.includes(type)}
          $typeColor={typeColors[type]}
          onClick={() => onTypeSelect(type)}
        >
          {type}
        </TypeButton>
      ))}
    </TypeFilterContainer>
  );
}

export default TypeFilter;
