/**
 * Shared Styles Module
 * Provides reusable styled components across the application
 * Features:
 * - Common layout components
 * - Consistent spacing and alignment
 * - Responsive design utilities
 * - Shared interaction styles
 */

import styled from 'styled-components';

// Responsive Container
export const ResponsiveContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

// Grid Layout
export const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
`;

// Button Styles
export const BaseButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Input Styles
export const BaseInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  border-radius: 24px;
  border: 2px solid transparent;
  background: white;
  font-size: 1rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 4px 16px rgba(74, 144, 226, 0.2);
  }
`;

// Loading Spinner
export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 48px;

  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border-left-color: #09f;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Error Message
export const ErrorMessage = styled.div`
  background: rgba(255, 0, 0, 0.1);
  color: #d32f2f;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  margin: 20px 0;
  border: 1px solid rgba(211, 47, 47, 0.2);
`;

// Glassmorphic Card
export const GlassmorphicCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;
