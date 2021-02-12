import * as React from 'react';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { Container } from './styles';

interface AnimatedRouteI {
  exact?: boolean;
  onExiting?: () => void;
  path: string;
}

const AnimatedRoute: React.FC<AnimatedRouteI> = ({
  exact = false,
  children,
  onExiting,
  path,
}) => (
  <Route
    exact={exact}
    path={path}
  >
    {({ match }) => (
      <CSSTransition
        classNames='fade'
        in={match !== null}
        onExiting={() => {
          if (onExiting) {
            onExiting();
          }
        }}
        timeout={300}
        unmountOnExit
      >
        <Container>
          {children}
        </Container>
      </CSSTransition>
    )}
  </Route>
);

export default AnimatedRoute;
