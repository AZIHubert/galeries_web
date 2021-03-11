import * as React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { LogoGaleries } from '#ressources/svgComponents';

import {
  userSelector,
} from '#store/selectors';

import Logger from './Logger';
import Updater from './Updater';
import {
  Container,
  Fader,
  InnerContainer,
  Logo,
} from './styles';

const UpdateEmail = () => {
  const user = useSelector(userSelector);

  return (
    <Container>
      <Logo>
        <LogoGaleries />
      </Logo>
      <CSSTransition
        classNames='fade'
        in={!!user}
        timeout={300}
        unmountOnExit
      >
        <Fader>
          <InnerContainer>
            <Updater />
          </InnerContainer>
        </Fader>
      </CSSTransition>
      <CSSTransition
        classNames='fade'
        in={!user}
        timeout={300}
        unmountOnExit
      >
        <Fader>
          <InnerContainer>
            <Logger />
          </InnerContainer>
        </Fader>
      </CSSTransition>
    </Container>
  );
};

export default UpdateEmail;
