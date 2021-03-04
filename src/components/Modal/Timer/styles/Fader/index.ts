import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

const Fader = styled.div`
  left: 50%;
  position: absolute;
  top: 14px;
  transform: translateX(-50%);
  z-index: 10;
  &.fade-enter {
    opacity: 0;
    top: 20px;
  }
  &.fade-enter-active {
    opacity: 1;
    top: 14px;
    transition: 500ms;
  }
  &.fade-exit {
    opacity: 1;
    top: 14px;
  }
  &.fade-exit-active {
    opacity: 0;
    top: 20px;
    transition: 500ms;
  }
  @media ${mediaQueries.laptopL} {
    &.fade-enter {
      top: 25px;
    }
    &.fade-enter-active {
      top: 20px;
    }
    &.fade-exit {
      top: 20px;
    }
    &.fade-exit-active {
      top: 25px;
    }
  }
`;

export default Fader;
