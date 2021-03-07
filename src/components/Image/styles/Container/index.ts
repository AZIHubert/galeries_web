import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

interface ContainerI {
  uri?: string;
}

const Container = styled.div<ContainerI>`
  background-image: ${({ uri }) => (
    uri ? `url("${uri}")` : 'none'
  )};
  background-color: ${({
    theme,
    uri,
  }) => (
    uri ? theme.colors.secondary : 'none'
  )};
  width: 100%;
  height: 100%;
  @media (prefers-reduced-motion: no-preference) {
    animation-name: ${fadeIn};
    animation-fill-mode: backwards;
  }
`;

export default Container;
