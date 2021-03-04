import styled from 'styled-components';

const Fader = styled.div`
  &.fade-enter {
    opacity: 0;
    & .background-container {
      right: 1px;
      top: 1px;
    }
  }
  &.fade-enter-active {
    opacity: 1;
    transition: 500ms;
    & .background-container {
      right: 4px;
      top: 4px;
      transition: 400ms;
    }
  }
  &.fade-exit {
    opacity: 1;
    & .background-container {
      right: 4px;
      top: 4px;
    }
  }
  &.fade-exit-active {
    opacity: 0;
    transition: 500ms;
    & .background-container {
      right: 1px;
      top: 1px;
      transition:  400ms;
    }
  }
`;

export default Fader;
