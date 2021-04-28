import styled from 'styled-components';

const Fader = styled.div`
  &.fade-enter {
    opacity: 0;
    transform: translateX(-100%);
  }
  &.fade-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: 300ms;
  }
  &.fade-exit {
    opacity: 1;
    transform: translateX(0);
  }
  &.fade-exit-active {
    opacity: 0;
    transform: translateX(-100%);
    transition: 300ms;
  }
`;

export default Fader;
