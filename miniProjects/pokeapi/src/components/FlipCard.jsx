import React, { useState } from 'react';
import {
  FlipImageContainer,
  CardInner,
  CardFace,
  CardBack,
  FlipButton
} from '../styles/FlipCardStyles';

function FlipCard({ frontImage, backImage }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <FlipImageContainer>
      <CardInner isFlipped={isFlipped}>
        <CardFace>
          <img src={frontImage} alt="Front view" />
        </CardFace>
        <CardBack>
          <img src={backImage} alt="Back view" />
        </CardBack>
      </CardInner>
      <FlipButton onClick={() => setIsFlipped(!isFlipped)}>
        {isFlipped ? '앞면 보기' : '뒷면 보기'}
      </FlipButton>
    </FlipImageContainer>
  );
}

export default FlipCard;
