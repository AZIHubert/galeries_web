import * as React from 'react';

import Text from '#components/Text';

import { UserContext } from '#contexts/UserContext';

import defaultProfilePicture from '#ressources/svg/defaultProfilePicture.svg';
import {
  Gear,
  Ticket,
} from '#ressources/svgComponents';

import {
  Background,
  Button,
  Container,
  InnerContainer,
  LogoContainer,
  ProfileImage,
} from './styles';

const PopupProfile = () => {
  const { user } = React.useContext(UserContext);
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
              fontSize={1.2}
            >
              { user ? user.userName : 'user name' }
            </Text>
            <Text
              fontSize={0.8}
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
          <Text>
            Edit your informations
          </Text>
        </Button>
        <Button
          data-testid='buttonTicketModal'
        >
          <LogoContainer>
            <Ticket />
          </LogoContainer>
          <div>
            <Text
              fontSize={0.65}
            >
              Share your opinion? Find a bug?
            </Text>
            <Text>
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
