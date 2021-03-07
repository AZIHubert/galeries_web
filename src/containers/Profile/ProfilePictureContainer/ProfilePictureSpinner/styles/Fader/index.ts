import styled from 'styled-components';

const Fader = styled.div`
  &.fade-enter {
    opacity: 0;
    transform: translateY(15px) scale(0.92);
  }
  &.fade-enter-active {
    opacity: 1;
    transform: translateY(0px) scale(1);
    transition: 100ms;
  }
  &.fade-exit {
    display: none;
  }
  &.fade-exit-active {
    display: none;
  }
`;

export default Fader;
