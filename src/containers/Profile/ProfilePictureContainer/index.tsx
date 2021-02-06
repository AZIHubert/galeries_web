import * as React from 'react';

import ProfilePicture from './ProfilePicture';

interface ProfilePictureI {
  id: string;
}

interface ProfilPictureContainerI {
  profilePictures: ProfilePictureI[];
}

const ProfilPictureContainer = ({ profilePictures }: ProfilPictureContainerI) => (
  profilePictures.map((profilePicture) => (
    <ProfilePicture key={profilePicture.id} />
  ))
);

export default ProfilPictureContainer;
