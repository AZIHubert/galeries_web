import styled from 'styled-components';

type Mode = 'cover' | 'height' | 'width';

interface FaderI {
  mode?: Mode;
}

const Fader = styled.div<FaderI>`
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
  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: 500ms;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: 500ms;
  }
`;

export default Fader;
