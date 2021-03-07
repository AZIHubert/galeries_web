import * as React from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import { CSSTransition } from 'react-transition-group';

import themeColor from '#helpers/theme';

import Image from '#components/Image';

import { ProfilePictureContext } from '#contexts/ProfilePictureContext';

import {
  Container,
  Fader,
  ImageContainer,
  InnerContainer,
  SpinnerContainer,
} from './styles';

const ProfilePicture = () => {
  const {
    isFetching,
    profilePicture,
  } = React.useContext(ProfilePictureContext);

  return (
    <Container>
      <InnerContainer>
        <ImageContainer
          isPending={isFetching}
        >
          <Image
            original={profilePicture.croped}
            pending={profilePicture.pending}
          />
        </ImageContainer>
        <CSSTransition
          classNames='fade'
          in={isFetching}
          timeout={300}
          unmountOnExit
        >
          <Fader>
            <SpinnerContainer>
              <BounceLoader
                color={themeColor.colors.secondary}
                size={60}
              />
            </SpinnerContainer>
          </Fader>
        </CSSTransition>
      </InnerContainer>
    </Container>
  );
};

export default ProfilePicture;
