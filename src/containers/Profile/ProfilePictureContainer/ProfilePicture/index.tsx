import * as React from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import { CSSTransition } from 'react-transition-group';

import Image from '#components/Image';

import { ProfilePictureContext } from '#contexts/ProfilePictureContext';

import themeColor from '#helpers/theme';

import {
  Container,
  Fader,
  Link,
  Opacity,
  SpinnerContainer,
} from './styles';

interface ProfilePictureContainerI {
  bigPicture: boolean;
  profilePicture: ProfilePictureI,
}

const ProfilePicture = ({
  bigPicture,
  profilePicture: {
    id,
    cropedImage,
    pendingImage,
  },
}: ProfilePictureContainerI) => {
  const {
    puttingImage,
    deletingImage,
  } = React.useContext(ProfilePictureContext);

  return (
    <Container
      bigPicture={bigPicture}
    >
      <Opacity
        isPutting={puttingImage === id || deletingImage === id}
      >
        <Link
          to={`/profilePicture/${id}`}
        >
          <Image
            mode='fill'
            original={cropedImage.signedUrl}
            pending={pendingImage.signedUrl}
          />
        </Link>
      </Opacity>
      <CSSTransition
        classNames='fade'
        in={puttingImage === id || deletingImage === id}
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
    </Container>
  );
};

export default React.memo(ProfilePicture);
