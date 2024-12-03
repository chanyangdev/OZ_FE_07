import React, { useState, memo } from "react";
import {
  FlipImageContainer,
  CardInner,
  CardFace,
  CardBack,
  FlipButton,
} from "../styles/FlipCardStyles";
import styled from "styled-components";

const LoadingPlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  color: #666;
  font-size: 0.9rem;
  
  &::after {
    content: "";
    width: 20px;
    height: 20px;
    border: 2px solid #ff5350;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-left: 8px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const FlipCard = memo(({ frontImage, backImage }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFrontLoading, setIsFrontLoading] = useState(true);
  const [isBackLoading, setIsBackLoading] = useState(true);

  const handleFrontImageLoad = () => {
    setIsFrontLoading(false);
  };

  const handleBackImageLoad = () => {
    setIsBackLoading(false);
  };

  const handleImageError = (e) => {
    console.error("Failed to load pokemon image");
    e.target.src = "/placeholder.png"; // Add a placeholder image
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <FlipImageContainer>
      <CardInner isFlipped={isFlipped}>
        <CardFace>
          {isFrontLoading && <LoadingPlaceholder>Loading...</LoadingPlaceholder>}
          <img
            src={frontImage}
            alt="Pokemon front"
            style={{ display: isFrontLoading ? "none" : "block" }}
            onLoad={handleFrontImageLoad}
            onError={handleImageError}
          />
        </CardFace>
        <CardBack>
          {isBackLoading && <LoadingPlaceholder>Loading...</LoadingPlaceholder>}
          <img
            src={backImage}
            alt="Pokemon back"
            style={{ display: isBackLoading ? "none" : "block" }}
            onLoad={handleBackImageLoad}
            onError={handleImageError}
          />
        </CardBack>
      </CardInner>
      <FlipButton onClick={toggleFlip}>
        {isFlipped ? "Show Front" : "Show Back"}
      </FlipButton>
    </FlipImageContainer>
  );
});

FlipCard.displayName = "FlipCard";

export default FlipCard;
