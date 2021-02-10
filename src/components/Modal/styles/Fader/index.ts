import styled from 'styled-components';

const Fader = styled.div`
  &.fade-enter {
    & .background-modal {
      opacity: 0;
    }
    & .modal {
      opacity: 0;
    }
  }
  &.fade-enter-active {
    & .background-modal {
      opacity: 0.7;
      transition: opacity 300ms;
    }
    & .modal {
      opacity: 1;
      transition: opacity 450ms;
    }
  }
  &.fade-enter-done {
    & .background-modal {
      opacity: 0.7;
    }
  }
  &.fade-exit {
    & .background-modal {
      opacity: 0.7;
    }
    & .modal {
      opacity: 1;
    }
  }
  &.fade-exit-active {
    & .background-modal {
      opacity: 0;
      transition: opacity 300ms;
    }
    & .modal {
      opacity: 0;
      transition: opacity 450ms;
    }
  }
`;

export default Fader;
