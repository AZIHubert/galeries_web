import styled from 'styled-components';

const Fader = styled.div`
  &.fade-enter {
    & .background {
      opacity: 0;
    }
    & .slideMenu {
      opacity: 0;
      width: 0;
    }
  }
  &.fade-enter-active {
    & .background {
      opacity: 0.7;
      transition: 500ms;
    }
    & .slideMenu {
      opacity: 1;
      transition: 500ms;
      width: 250px;
    }
  }
  &.fade-enter-done {
    & .background {
      opacity: 0.7;
    }
    & .slideMenu {
      opacity: 1;
      width: 250px;
    }
  }
  &.fade-exit {
    & .background {
      opacity: 0.7;
    }
    & .slideMenu {
      opacity: 1;
      width: 250px;
    }
  }
  &.fade-exit-active {
    & .background {
      opacity: 0;
      transition: 500ms;
    }
    & .slideMenu {
      opacity: 0;
      transition: 500ms;
      width: 0;
    }
  }
  &.fade-exit-done {
    & .background {
      opacity: 0;
    }
    & .slideMenu {
      opacity: 0;
      width: 0;
    }
  }
`;

export default Fader;
