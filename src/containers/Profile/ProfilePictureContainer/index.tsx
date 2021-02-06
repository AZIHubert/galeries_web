import * as React from 'react';

import { ProfilePictureI } from '#helpers/interfaces';

import ProfilePicture from './ProfilePicture';

interface ProfilPictureContainerI {
  currentProfileId: string | null;
  profilePictures: ProfilePictureI[];
  switchCurrent: (id: string) => void;
}

const ProfilePictureContainer = ({
  currentProfileId,
  profilePictures,
  switchCurrent,
}: ProfilPictureContainerI) => (
  <div>
    {profilePictures.map((profilePicture) => (
      <ProfilePicture
        current={currentProfileId === profilePicture.id}
        key={profilePicture.id}
        profilePicture={profilePicture}
        switchCurrent={switchCurrent}
      />
    ))}
  </div>
);

export default ProfilePictureContainer;
