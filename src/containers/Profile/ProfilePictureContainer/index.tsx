import * as React from 'react';

import { ProfilePictureContext } from '#contexts/ProfilePictureContext';

import ProfilePicture from './ProfilePicture';
import ProfilPictureSpinner from './ProfilePictureSpinner';

import {
  Container,
} from './styles';

const ProfilePictureContainer = () => {
  const { profilePictures } = React.useContext(ProfilePictureContext);

  return (
    <Container>
      <ProfilPictureSpinner />
      {Object.keys(profilePictures).sort(
        (a, b) => (
          new Date(profilePictures[b].createdAt).getTime()
          - new Date(profilePictures[a].createdAt).getTime()
        ),
      ).map((index, i) => {
        const bigPicture = i % 12 === 3;
        return (
          <ProfilePicture
            bigPicture={bigPicture}
            key={profilePictures[index].id}
            profilePicture={profilePictures[index]}
          />
        );
      })}
    </Container>
  );
};

export default ProfilePictureContainer;
