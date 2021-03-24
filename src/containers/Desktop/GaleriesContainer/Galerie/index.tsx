import * as React from 'react';

import Image from '#components/Image';
import Text from '#components/Text';

import {
  selectProfilPicture,
} from '#store/helpers';

import {
  Container,
  CoverPicture,
  Information,
  ProfilePicturesContainer,
  ProfilePicture,
} from './styles';

interface GalerieComponentI {
  galerie: GalerieI
}

const Galerie = ({
  galerie,
}: GalerieComponentI) => (
  <Container
    to={`galerie/${galerie.id}`}
  >
    <CoverPicture
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
      <ProfilePicturesContainer>
        {galerie.users.map((user) => (
          <ProfilePicture
            key={user.id}
          >
            <Image
              alt={`${user.userName}'s profile picture`}
              original={selectProfilPicture(user).croped}
            />
          </ProfilePicture>
        ))}
      </ProfilePicturesContainer>
    </Information>
  </Container>
);

export default Galerie;
