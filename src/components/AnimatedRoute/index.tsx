import * as React from 'react';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

interface AnimatedRouteI {
  exact?: boolean;
  onExisted?: () => void;
  path: string;
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

const AnimatedRoute: React.FC<AnimatedRouteI> = ({
  exact = false,
  children,
  onExisted,
  path,
}) => (
  <Route
    exact={exact}
    path={path}
  >
    {({ match }) => (
      <CSSTransition
        in={match !== null}
        classNames='fade'
        timeout={300}
        unmountOnExit
        onExited={() => {
          if (onExisted) {
            onExisted();
          }
        }}
      >
        <Container>
          {children}
        </Container>
      </CSSTransition>
    )}
  </Route>
);

export default AnimatedRoute;
