import * as React from 'react';
import { useSelector } from 'react-redux';
import BounceLoader from 'react-spinners/BounceLoader';
import { CSSTransition } from 'react-transition-group';

import theme from '#helpers/theme';

import Image from '#components/Image';

import { ProfilePictureContext } from '#contexts/ProfilePictureContext';

import { userSelector } from '#store/selectors';

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
    deletingImage,
    puttingImage,
    profilePicture,
  } = React.useContext(ProfilePictureContext);

  const user = useSelector(userSelector);

  const isDeletingCurrentProfilePicture = () => {
    if (user && !!deletingImage && user.currentProfilePictureId === deletingImage) {
      return true;
    }
    return false;
  };

  return (
    <Container>
      <InnerContainer>
        <ImageContainer
          isPending={isPosting || !!puttingImage || isDeletingCurrentProfilePicture()}
        >
          <Image
            alt='current profile picture'
            mode='fill'
            original={profilePicture.croped}
            pending={profilePicture.pending}
          />
        </ImageContainer>
        <CSSTransition
          classNames='fade'
          in={isPosting || !!puttingImage || isDeletingCurrentProfilePicture()}
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
