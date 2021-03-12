import * as React from 'react';
import { useSelector } from 'react-redux';

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
  Fader,
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
    <Fader>
      <Container
        testId={testId}
      >
        <InnerContainer>
          <Link
            onClick={handleClose}
            to='/profile'
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
                styles={{
                  fontSize: 1,
                }}
                stylesLaptopL={{
                  fontSize: 1.1,
                }}
              >
                { user ? user.userName : 'user name' }
              </Text>
              <Text
                color='primary'
                styles={{
                  fontSize: 0.7,
                }}
                stylesLaptopL={{
                  fontSize: 0.8,
                }}
              >
                  see your profile
              </Text>
            </div>
          </Link>
          <Link
            onClick={handleClose}
            to='/edit'
          >
            <LogoContainer>
              <Gear />
            </LogoContainer>
            <Text
              color='primary'
              styles={{
                fontSize: 0.8,
              }}
              stylesLaptopL={{
                fontSize: 0.9,
              }}
            >
              Edit your informations
            </Text>
          </Link>
          <Button
            onClick={() => {
              handleClose();
              handleOpenTicket();
            }}
          >
            <LogoContainer>
              <Ticket />
            </LogoContainer>
            <div>
              <Text
                color='primary'
                styles={{
                  fontSize: 0.5,
                }}
                stylesLaptopL={{
                  fontSize: 0.65,
                }}
              >
                Share your opinion? Find a bug?
              </Text>
              <Text
                color='primary'
                styles={{
                  fontSize: 0.8,
                }}
                stylesLaptopL={{
                  fontSize: 0.9,
                }}
              >
                send a ticket
              </Text>
            </div>
          </Button>
        </InnerContainer>
        <Background />
      </Container>
    </Fader>
  );
};

export default PopupProfile;
