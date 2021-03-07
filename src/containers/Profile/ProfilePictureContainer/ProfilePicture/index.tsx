import * as React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import BounceLoader from 'react-spinners/BounceLoader';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Image from '#components/Image';

import themeColor from '#helpers/theme';
import { ProfilePictureContext } from '#contexts/ProfilePictureContext';

import { putProfilePicture } from '#store/actions';
import { userSelector } from '#store/selectors';

import {
  Container,
  Link,
} from './styles';

interface ContainerSelectorI {
  current: boolean;
}

const Fader = styled.div`
  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: 500ms;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: 500ms;
  }
`;

const SpinnerContainer = styled.div`
  height: 60px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: ${({ theme }) => theme.transition.slow};
  width: 60px;
`;

const ContainerSelector = styled.div<ContainerSelectorI>`
  background-color: ${({
    current,
    theme,
  }) => (
    current ? theme.colors.primary : theme.colors.secondary
  )};
  border-radius: 50%;
  cursor: pointer;
  height: 30px;
  position: absolute;
  right: 20px;
  top: 20px;
  transition: ${({ theme }) => theme.transition.default};
  width: 30px;
  z-index: 1;
`;

interface OpacityI {
  isPutting: boolean;
}

const Opacity = styled.div<OpacityI>`
  opacity: ${({ isPutting }) => (isPutting ? 0.5 : 1)};
  transition: ${({ theme }) => theme.transition.default};
`;

interface ProfilePictureContainerI {
  id: string;
  profilePicture: ProfilePictureI,
}

const ProfilePicture = ({
  id,
  profilePicture: {
    cropedImage,
    pendingImage,
  },
}: ProfilePictureContainerI) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const {
    puttingImage,
    setPuttingImage,
  } = React.useContext(ProfilePictureContext);

  const isCurrent = () => {
    if (user && user.currentProfilePictureId === id) {
      return true;
    }
    return false;
  };

  return (
    <Container>
      <ContainerSelector
        current={isCurrent()}
        onClick={() => {
          dispatch(putProfilePicture({ id }));
          setPuttingImage(id);
        }}
      />
      <Opacity
        isPutting={puttingImage === id}
      >
        <Link
          to={`/image/${id}`}
        >
          <Image
            original={cropedImage.signedUrl}
            pending={pendingImage.signedUrl}
          />
        </Link>
      </Opacity>
      <CSSTransition
        classNames='fade'
        in={puttingImage === id}
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

export default ProfilePicture;
