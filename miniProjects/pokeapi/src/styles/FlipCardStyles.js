/**
 * Flip Card Styles Module
 * Provides styled components for interactive Pokemon cards
 * Features:
 * - 3D flip animation styling
 * - Front and back card design
 * - Responsive card dimensions
 * - Transition and transform effects
 */

import styled from "styled-components";

export const FlipImageContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  perspective: 1000px;
  margin: 0 auto;
  margin-bottom: 80px; // Increased margin for more space

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }

  @media (max-width: 480px) {
    width: 200px;
    height: 200px;
  }
`;

export const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: ${({ isFlipped }) =>
    isFlipped ? "rotateY(180deg)" : "rotateY(0)"};
`;

export const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  img {
    width: 80%;
    height: 80%;
    object-fit: contain;
  }
`;

export const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
`;

export const FlipButton = styled.button`
  position: absolute;
  bottom: -65px; // Increased bottom spacing
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 16px;
  background-color: #ff5350;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  white-space: nowrap;
  z-index: 2;

  &:hover {
    background-color: #ff3d3a;
    transform: translateX(-50%) scale(1.05);
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.9rem;
  }
`;
