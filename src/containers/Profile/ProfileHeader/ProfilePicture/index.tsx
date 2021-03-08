import * as React from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import { CSSTransition } from 'react-transition-group';

import theme from '#helpers/theme';

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
    isPosting,
    isPutting,
    profilePicture,
  } = React.useContext(ProfilePictureContext);

  return (
    <Container>
      <InnerContainer>
        <ImageContainer
          isPending={isPosting || isPutting}
        >
          <Image
            alt='current profile picture'
            original={profilePicture.croped}
            pending={profilePicture.pending}
          />
        </ImageContainer>
        <CSSTransition
          classNames='fade'
          in={isPosting || isPutting}
          timeout={300}
          unmountOnExit
        >
          <Fader>
            <SpinnerContainer>
              <BounceLoader
                color={theme.colors.secondary}
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
