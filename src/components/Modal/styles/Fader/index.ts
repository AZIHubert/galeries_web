import styled from 'styled-components';

const Fader = styled.div`
  &.fade-enter {
    & .background-modal {
      opacity: 0;
    }
    & .background-container {
      top: 8px;
      right: 8px;
    }
    & .modal {
      transform: translate(-50%, -50%) scale(1.03);
      opacity: 0;
    }
  }
  &.fade-enter-active {
    & .background-modal {
      opacity: 0.7;
      transition: opacity 300ms;
    }
    & .background-container {
      right: 15px;
      top: 15px;
      transition: 400ms;
    }
    & .modal {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
      transition: 450ms;
    }
  }
  &.fade-exit {
    & .background-modal {
      opacity: 0.7;
    }
    & .background-container {
      right: 15px;
      top: 15px;
    }
    & .modal {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }
  &.fade-exit-active {
    & .background-modal {
      opacity: 0;
      transition: opacity 300ms;
    }
    & .background-container {
      right: 8px;
      top: 8px;
      transition:  450ms;
    }
    & .modal {
      opacity: 0;
      transform: translate(-50%, -50%) scale(1.03);
      transition:  450ms;
    }
  }
`;

export default Fader;
