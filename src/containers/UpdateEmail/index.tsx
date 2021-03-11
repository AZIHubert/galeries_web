import * as React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import { LogoGaleries } from '#ressources/svgComponents';

import {
  userSelector,
  updateEmailConfirmStatusSelector,
} from '#store/selectors';

import Logger from './Logger';
import Updater from './Updater';
import Landing from './Landing';
import {
  Container,
  Fader,
  InnerContainer,
  Logo,
} from './styles';

const UpdateEmail = () => {
  const user = useSelector(userSelector);
  const updateEmailConfirmStatus = useSelector(updateEmailConfirmStatusSelector);
  const [landing, setLanding] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  React.useEffect(() => {
    if (updateEmailConfirmStatus === 'success') {
      setLanding(true);
    }
  }, [updateEmailConfirmStatus]);

  return (
    <Container>
      <Logo>
        <LogoGaleries />
      </Logo>
      <CSSTransition
        classNames='fade'
        in={!!user && !landing}
        timeout={300}
        unmountOnExit
      >
        <Fader>
          <InnerContainer>
            <Updater
              setEmail={setEmail}
              setPassword={setPassword}
            />
          </InnerContainer>
        </Fader>
      </CSSTransition>
      <CSSTransition
        classNames='fade'
        in={!!user && landing}
        timeout={300}
        unmountOnExit
      >
        <Fader>
          <InnerContainer>
            <Landing
              password={password}
              email={email}
            />
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
