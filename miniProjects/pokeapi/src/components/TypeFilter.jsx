import React from 'react';
import { TypeFilterContainer, TypeButton, typeColors } from '../styles/TypeFilterStyles';

function TypeFilter({ selectedTypes, onTypeSelect }) {
  return (
    <TypeFilterContainer>
      {Object.keys(typeColors).map((type) => (
        <TypeButton
          key={type}
          isSelected={selectedTypes.includes(type)}
          typeColor={typeColors[type]}
          onClick={() => onTypeSelect(type)}
        >
          {type}
        </TypeButton>
      ))}
    </TypeFilterContainer>
  );
}

export default TypeFilter;
