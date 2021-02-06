import * as React from 'react';

import { ProfilePictureI } from '#helpers/interfaces';

interface ProfilePictureComponentI {
  current: boolean;
  profilePicture: ProfilePictureI;
  switchCurrent: (id: string) => void
}

const ProfilePicture = ({
  profilePicture: {
    id,
    originalImage: {
      signedUrl,
    },
  },
  switchCurrent,
}: ProfilePictureComponentI) => (
  <div
    data-testid='profilePicture'
  >
    <button
      data-testid='profilePictureButton'
      onClick={() => switchCurrent(id)}
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
