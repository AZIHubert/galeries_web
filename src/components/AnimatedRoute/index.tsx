import * as React from 'react';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import {
  Container,
  Fader,
} from './styles';

interface AnimatedRouteI {
  onExiting?: () => void;
  path: string;
  testId?: string;
}

const AnimatedRoute: React.FC<AnimatedRouteI> = ({
  children,
  onExiting,
  path,
  testId,
}) => (
  <Route
    exact
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
        <Fader>
          <Container
            testId={testId}
          >
            {children}
          </Container>
        </Fader>
      </CSSTransition>
    )}
  </Route>
);

export default AnimatedRoute;
