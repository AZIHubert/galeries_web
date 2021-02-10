import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import Home from '#containers/Home';
import ConfirmAccount from '#containers/ConfirmAccount';

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

const Routes = () => {
  const [openCallbackModal, setOpenCallbackModal] = React.useState<boolean>(false);
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
          >
            <Container>
              <ConfirmAccount
                setCallbackModal={setCallbackModal}
                setOpenCallbackModal={setOpenCallbackModal}
              />
            </Container>
          </CSSTransition>
        )}
      </Route>
    </Router>
  );
};

export default Routes;
