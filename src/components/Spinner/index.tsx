import * as React from 'react';
import DotLoader from 'react-spinners/DotLoader';
import { CSSTransition } from 'react-transition-group';

import theme from '#helpers/theme';

import {
  Container,
  Fader,
} from './styles';

interface SpinnerI {
  show: boolean;
}

const Spinner = ({
  show,
}: SpinnerI) => (
  <CSSTransition
    classNames='fade'
    in={show}
    timeout={300}
    unmountOnExit
  >
    <Fader>
      <Container>
        <DotLoader
          color={theme.colors.primary}
          size={50}
        />
      </Container>
    </Fader>
  </CSSTransition>
);

export default Spinner;
