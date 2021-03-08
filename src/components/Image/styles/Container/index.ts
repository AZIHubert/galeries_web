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

const Container = styled.div.attrs<ContainerI>(
  ({
    theme,
    uri,
  }) => ({
    style: {
      backgroundImage: uri ? `url("${uri}")` : 'none',
      backgroundColor: uri ? theme.colors.secondary : 'none',
    },
  }),
)<ContainerI>`
  width: 100%;
  height: 100%;
  @media (prefers-reduced-motion: no-preference) {
    animation-name: ${fadeIn};
    animation-fill-mode: backwards;
  }
`;

export default Container;
