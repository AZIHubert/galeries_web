import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

type Mode = 'cover' | 'height' | 'width';

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
  width: ${({ mode }) => {
    if (mode === 'cover' || mode === 'width') {
      return '100%';
    }

    return 'auto';
  }};
  height: ${({ mode }) => {
    if (mode === 'cover' || mode === 'height') {
      return '100%';
    }

    return 'auto';
  }};
  @media (prefers-reduced-motion: no-preference) {
    animation-name: ${fadeIn};
    animation-fill-mode: backwards;
  }
`;

export default Container;
