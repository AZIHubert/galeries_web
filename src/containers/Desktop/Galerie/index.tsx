import * as React from 'react';
import styled from 'styled-components';

import Image from '#components/Image';
import Text from '#components/Text';

import {
  selectProfilPicture,
} from '#store/helpers';

interface GalerieComponentI {
  galerie: GalerieI
}

const Container = styled.div`
  box-shadow: ${({ theme }) => theme.boxShadow};
  display: flex;
  flex-direction: column;
  height: 140px;
  width: 210px;
  overflow: hidden;
  border-radius: 12px;
  margin: 10px;
`;

interface GalerieCoverPictureI {
  backgroundColor: string;
}

const GalerieCoverPicture = styled.div<GalerieCoverPictureI>`
  background-image: ${({ backgroundColor }) => backgroundColor};
  height: 110px;
  width: 100%;
`;

const Information = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
  padding: 3px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProfilePictureContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
const ProfilePictureImage = styled.div`
  height: 22px;
  width: 22px;
  border: ${({ theme }) => (
    `2px solid ${theme.colors.white}`
  )};
  border-radius: 50%;
  overflow: hidden;
  margin-right: -6px;
`;

const Galerie = ({
  galerie,
}: GalerieComponentI) => (
  <Container>
    <GalerieCoverPicture
      backgroundColor={galerie.defaultCoverPicture}
    />
    <Information>
      <Text
        fontWeight='bold'
        styles={{
          fontSize: 0.75,
        }}
      >
        {galerie.name}
      </Text>
      <ProfilePictureContainer>
        {galerie.users.map((user) => (
          <ProfilePictureImage
            key={user.id}
          >
            <Image
              alt={`${user.userName}'s profile picture`}
              original={selectProfilPicture(user).croped}
            />
          </ProfilePictureImage>
        ))}
      </ProfilePictureContainer>
    </Information>
  </Container>
);

export default Galerie;
