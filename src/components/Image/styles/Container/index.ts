import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

type Mode = 'cover' | 'contain';

interface ContainerI {
  mode?: Mode;
  uri?: string;
}

const Container = styled.div.attrs<ContainerI>(
  ({
    theme,
    uri,
  }) => ({
    style: {
      backgroundImage: uri ? `url("${uri}")` : 'none',
      backgroundColor: uri ? theme.colors.tertiary : 'none',
    },
  }),
)<ContainerI>`
  display: inline-block;
  height: 100%;
  width: ${({ mode }) => `${mode === 'contain' ? 'auto' : '100%'}`};
  @media (prefers-reduced-motion: no-preference) {
    animation-name: ${fadeIn};
    animation-fill-mode: backwards;
  }
`;

export default Container;
