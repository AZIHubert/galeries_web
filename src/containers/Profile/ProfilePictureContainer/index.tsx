import * as React from 'react';

import { UserContext } from '#contexts/UserContext';

import ProfilePicture from './ProfilePicture';

const ProfilePictureContainer = () => {
  const { user } = React.useContext(UserContext);
  if (!user) return null;
  return (
    <div>
      {user.profilePictures.map((profilePicture) => (
        <ProfilePicture
          key={profilePicture.id}
          profilePicture={profilePicture}
        />
      ))}
    </div>
  );
};

export default ProfilePictureContainer;
