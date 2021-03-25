import * as React from 'react';
import {
  useSelector,
} from 'react-redux';

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

import {
  userSelector,
} from '#store/selectors';

interface GalerieComponentI {
  galerie: GalerieI
}

const Galerie = ({
  galerie,
}: GalerieComponentI) => {
  const currentUser = useSelector(userSelector);
  return (
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
          {galerie.users.filter((user) => {
            if (!currentUser) {
              return true;
            }
            return user.id !== currentUser.id;
          }).map((user) => (
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
};

export default Galerie;
