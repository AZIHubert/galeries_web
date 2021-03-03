import * as React from 'react';
import { useSelector } from 'react-redux';
import BounceLoader from 'react-spinners/BounceLoader';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Image from '#components/Image';
import themeColor from '#helpers/theme';

import {
  profilePictureCurrentSelector,
  profilePictureStatusSelector,
} from '#store/selectors';

import {
  Container,
  InnerContainer,
} from './styles';

interface ContainerTwoI {
  isPending?: boolean;
}

const ContainerTwo = styled.div<ContainerTwoI>`
  opacity: ${({ isPending }) => (isPending ? 0.1 : 1)};
  position: absolute;
  top: 0;
  right: 0;
  transition: ${({ theme }) => theme.transition.slow};
`;
ContainerTwo.defaultProps = {
  isPending: true,
};
const ContainerThree = styled.div<ContainerTwoI>`
  position: absolute;
  top: 50%;
  width: 60px;
  height: 60px;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: ${({ theme }) => theme.transition.slow};
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
ContainerTwo.defaultProps = {
  isPending: true,
};

const ProfilePicture = () => {
  const currentProfilePicture = useSelector(profilePictureCurrentSelector);
  const profilePictureStatus = useSelector(profilePictureStatusSelector);
  const [displayNewImage, setDisplayNewImage] = React.useState<boolean>(false);
  const [image, setImage] = React.useState(currentProfilePicture);

  const isPending = profilePictureStatus === 'fetching';

  React.useEffect(() => {
    if (isPending) {
      setDisplayNewImage(true);
      setTimeout(() => setDisplayNewImage(false), 1000);
    }
  }, [isPending]);

  React.useEffect(() => {
    if (!displayNewImage && profilePictureStatus === 'success') {
      setImage(currentProfilePicture);
    }
  }, [displayNewImage, profilePictureStatus]);

  return (
    <Container>
      <InnerContainer>
        <ContainerTwo
          isPending={displayNewImage}
        >
          <Image
            original={image.croped}
            pending={image.pending}
          />
        </ContainerTwo>
        <CSSTransition
          classNames='fade'
          in={displayNewImage}
          timeout={300}
          unmountOnExit
        >
          <ContainerThree
            isPending={displayNewImage}
          >
            <BounceLoader
              size={60}
              color={themeColor.colors.secondary}
            />
          </ContainerThree>
        </CSSTransition>
      </InnerContainer>
    </Container>
  );
};

export default ProfilePicture;
