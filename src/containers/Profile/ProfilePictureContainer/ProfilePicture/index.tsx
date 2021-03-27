import * as React from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import { CSSTransition } from 'react-transition-group';

import Image from '#components/Image';

import { ProfilePictureContext } from '#contexts/ProfilePictureContext';

import themeColor from '#helpers/theme';

import DeleteButton from './DeleteButton';
import PutButton from './PutButton';

import {
  Container,
  Fader,
  Link,
  Opacity,
  SpinnerContainer,
} from './styles';

interface ProfilePictureContainerI {
  profilePicture: ProfilePictureI,
}

const ProfilePicture = ({
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
    <Container>
      <PutButton
        id={id}
      />
      <DeleteButton
        id={id}
      />
      <Opacity
        isPutting={puttingImage === id || deletingImage === id}
      >
        <Link
          to={`/profilePicture/${id}`}
        >
          <Image
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
