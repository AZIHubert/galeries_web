import * as React from 'react';

import { ProfilePictureI } from '#helpers/interfaces';

interface ProfilePictureComponentI {
  profilePicture: ProfilePictureI;
  switchCurrent: () => void
}

const ProfilePicture = ({
  profilePicture: {
    originalImage: {
      signedUrl,
    },
  },
  switchCurrent,
}: ProfilePictureComponentI) => (
  <div>
    <button
      data-testid='profilePictureButton'
      onClick={switchCurrent}
    />
    <a href='#'>
      <img
        src={signedUrl}
        alt='profile picture'
      />
    </a>
  </div>
);

export default ProfilePicture;
