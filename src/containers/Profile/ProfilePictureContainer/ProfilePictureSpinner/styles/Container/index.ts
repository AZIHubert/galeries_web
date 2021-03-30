import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from { background-position: left; }
  to { background-position: right; }
`;

const Container = styled.div`
  animation: 2s linear 1s infinite alternate ${slideIn};
  aspect-ratio: 1;
  background-image: ${({ theme }) => (
    `linear-gradient(45deg, ${theme.colors.tertiary} 0%, ${theme.colors.primary} 100%)`
  )};
  background-size: 200%;
  border-radius: 4px;
  position: relative;
`;

export default Container;
