import * as React from 'react';
import {
  useSelector,
} from 'react-redux';

import Image from '#components/Image';
import Text from '#components/Text';

import {
  Gear,
  Ticket,
} from '#ressources/svgComponents';

import {
  profilePictureCurrentSelector,
  userSelector,
} from '#store/selectors';

import {
  Background,
  Button,
  Container,
  InnerContainer,
  Link,
  LogoContainer,
  ProfileImage,
} from './styles';

interface PopupProfileI {
  handleClose: () => void;
  handleOpenTicket: () => void;
  testId?: string;
}

const PopupProfile = ({
  handleClose,
  handleOpenTicket,
  testId,
}: PopupProfileI) => {
  const { croped, pending } = useSelector(profilePictureCurrentSelector);
  const user = useSelector(userSelector);

  return (
    <Container
      testId={testId}
    >
      <InnerContainer>
        <Link
          onClick={handleClose}
          to='/profile'
          borderBottom
        >
          <ProfileImage>
            <Image
              original={croped}
              pending={pending}
            />
          </ProfileImage>
          <div>
            <Text
              color='primary'
              fontSize={1}
              fontSizeL={1.1}
            >
              { user ? user.userName : 'user name' }
            </Text>
            <Text
              color='primary'
              fontSize={0.7}
              fontSizeL={0.8}
            >
              see your profile
            </Text>
          </div>
        </Link>
        <Button
          borderBottom
        >
          <LogoContainer>
            <Gear />
          </LogoContainer>
          <Text
            color='primary'
            fontSize={0.8}
            fontSizeL={0.9}
          >
            Edit your informations
          </Text>
        </Button>
        <Button
          onClick={() => {
            handleOpenTicket();
            handleClose();
          }}
        >
          <LogoContainer>
            <Ticket />
          </LogoContainer>
          <div>
            <Text
              color='primary'
              fontSize={0.5}
              fontSizeL={0.65}
            >
              Share your opinion? Find a bug?
            </Text>
            <Text
              color='primary'
              fontSize={0.8}
              fontSizeL={0.9}
            >
              send a ticket
            </Text>
          </div>
        </Button>
      </InnerContainer>
      <Background />
    </Container>
  );
};

export default PopupProfile;
