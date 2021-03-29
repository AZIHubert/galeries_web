import styled from 'styled-components';

type Mode = 'cover' | 'height' | 'width' | 'fill';

interface FaderI {
  mode?: Mode;
  hide: boolean;
}

const Fader = styled.div<FaderI>`
  width: ${({ mode }) => {
    if (mode === 'fill' || mode === 'width') {
      return '100%';
    }
    return 'auto';
  }};
  height: ${({ mode }) => {
    if (mode === 'fill' || mode === 'height') {
      return '100%';
    }
    return 'auto';
  }};
  opacity: ${({ hide }) => (hide ? 0 : 1)};
  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: 500ms;
  }
  &.fade-enter-done {
    opacity: 1;
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
