import styled from 'styled-components';

const Fader = styled.div`
  &.fade-enter {
    & .background-modal {
      opacity: 0;
    }
    & .modal {
      opacity: 0;
      transform: translate(-50%, -50%) scale(1.03);
    }
  }
  &.fade-enter-active {
    & .background-modal {
      opacity: 0.7;
      transition: opacity 300ms;
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
    & .modal {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
  &.fade-exit-active {
    & .background-modal {
      opacity: 0;
      transition: opacity 300ms;
    }
    & .modal {
      opacity: 0;
      transform: translate(-50%, -50%) scale(1.03);
      transition:  450ms;
    }
  }
`;

export default Fader;
