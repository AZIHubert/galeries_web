import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import Home from '#containers/Home';
import ConfirmAccount from '#containers/ConfirmAccount';
import Modal from '#components/Modal';

type Variant = 'error' | 'primary';

interface InnerContainerI {
  variant?: Variant
}

interface BackgroundBottomI {
  variant?: Variant;
}

interface BackgroundTopI {
  variant?: Variant;
}

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
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

const InnerContainer = styled.div<InnerContainerI>`
  background-color: #FFFFF4;
  border: ${({
    variant,
    theme,
  }) => (
    `3px solid ${variant === 'primary' ? theme.colors.primary : theme.colors.danger}`
  )};
  box-sizing: ${({ theme }) => theme.boxShadow};
  color: ${({
    variant,
    theme,
  }) => (
    variant === 'primary' ? theme.colors.primary : theme.colors.danger
  )};
  display: flex;
  flex-direction: column;
  font-size: 1.1.rem;
  font-weight: bold;
  padding: 35px 20px;
  text-align: center;
  z-index: 1;
`;

InnerContainer.defaultProps = {
  variant: 'primary',
};

const BackgroundBottom = styled.div.attrs(() => ({
  className: 'background-container',
}))<BackgroundBottomI>`
  background-color: ${({ variant, theme }) => (
    variant === 'primary' ? theme.colors.primary : theme.colors.danger
  )};
  box-shadow: ${({ theme }) => theme.boxShadow};
  height: 100%;
  position: absolute;
  width: 100%;
  right: 15px;
  top: 15px;
`;

BackgroundBottom.defaultProps = {
  variant: 'primary',
};

const BackgroundTop = styled.div<BackgroundTopI>`
  border: ${({ variant, theme }) => (
    `3px solid ${variant === 'primary' ? theme.colors.primary : theme.colors.danger}`
  )};
  bottom: 10px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  height: 100%;
  position: absolute;
  right: -10px;
  width: 100%;
`;

BackgroundTop.defaultProps = {
  variant: 'primary',
};

const CallbackModalContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: auto;
  position: 'absolute';
`;

const Routes = () => {
  const [openCallbackModal, setOpenCallbackModal] = React.useState<boolean>(false);
  const [callbackModalError, setCallbackModalError] = React.useState<boolean>(false);
  const [callbackModal, setCallbackModal] = React.useState<string>('');
  return (
    <Router>
      <Route
        exact
        path="/"
      >
        {({ match }) => (
          <CSSTransition
            in={match !== null}
            classNames='fade'
            timeout={300}
            unmountOnExit
          >
            <Container>
              <Home />
            </Container>
          </CSSTransition>
        )}
      </Route>
      <Route
        path={'/confirmation/:token'}
      >
        {({ match }) => (
          <CSSTransition
            in={match !== null}
            classNames='fade'
            timeout={300}
            unmountOnExit
            onExiting={() => {
              setOpenCallbackModal(true);
            }}
          >
            <Container>
              <ConfirmAccount
                setCallbackModal={setCallbackModal}
                setCallbackModalError={setCallbackModalError}
              />
            </Container>
          </CSSTransition>
        )}
      </Route>
      <Modal
        open={openCallbackModal}
        handleClose={() => setOpenCallbackModal(false)}
      >
        <>
          <CallbackModalContainer>
            <InnerContainer
              variant={callbackModalError ? 'error' : 'primary'}
            >
              {callbackModal}
            </InnerContainer>
            <BackgroundBottom
              variant={callbackModalError ? 'error' : 'primary'}
            />
          </CallbackModalContainer>
        </>
      </Modal>
    </Router>
  );
};

export default Routes;
