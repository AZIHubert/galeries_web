import * as React from 'react';

import { ProfilePictureContext } from '#contexts/ProfilePictureContext';

import ProfilePicture from './ProfilePicture';
import ProfilPictureSpinner from './ProfilePictureSpinner';

import {
  Container,
  InnerContainer,
} from './styles';

const ProfilePictureContainer = () => {
  const { profilePictures } = React.useContext(ProfilePictureContext);

  return (
    <Container>
      <InnerContainer>
        <ProfilPictureSpinner />
        {Object.keys(profilePictures).sort(
          (a, b) => (
            new Date(profilePictures[b].createdAt).getTime()
            - new Date(profilePictures[a].createdAt).getTime()
          ),
        ).map((index) => (
          <ProfilePicture
            id={index}
            key={index}
            profilePicture={profilePictures[index]}
          />
        ))}
      </InnerContainer>
    </Container>
  );
};

export default ProfilePictureContainer;
