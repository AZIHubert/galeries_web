import * as React from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import { CSSTransition } from 'react-transition-group';

import { ProfilePictureContext } from '#contexts/ProfilePictureContext';

import theme from '#helpers/theme';

import {
  Container,
  Fader,
  SpinnerContainer,
} from './styles';

const ProfilePictureSpinner = () => {
  const { isPosting } = React.useContext(ProfilePictureContext);

  return (
    <CSSTransition
      classNames='fade'
      in={isPosting}
      timeout={300}
      unmountOnExit
    >
      <Fader>
        <Container>
          <SpinnerContainer>
            <BounceLoader
              color={theme.colors.secondary}
              size={60}
            />
          </SpinnerContainer>
        </Container>
      </Fader>
    </CSSTransition>
  );
};

export default ProfilePictureSpinner;
