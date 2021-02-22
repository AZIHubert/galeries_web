import * as React from 'react';
import {
  useSelector,
} from 'react-redux';

import Text from '#components/Text';

import defaultProfilePicture from '#ressources/svg/defaultProfilePicture.svg';
import {
  Gear,
  Ticket,
} from '#ressources/svgComponents';

import { userSelector } from '#store/selectors';

import {
  Background,
  Button,
  Container,
  InnerContainer,
  LogoContainer,
  ProfileImage,
} from './styles';

interface PopupProfileI {
  handleOpenTicket: () => void;
}

const PopupProfile = ({
  handleOpenTicket,
}: PopupProfileI) => {
  const user = useSelector(userSelector);
  return (
    <Container
      data-testid='popupProfil'
    >
      <InnerContainer>
        <Button
          borderBottom
        >
          <ProfileImage
            alt='profile picture'
            src={defaultProfilePicture}
          />
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
        </Button>
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
          data-testid='buttonTicketModal'
          onClick={handleOpenTicket}
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
