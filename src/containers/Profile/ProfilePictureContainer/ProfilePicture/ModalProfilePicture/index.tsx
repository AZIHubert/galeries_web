import moment from 'moment';
import * as React from 'react';

import { UserContext } from '#contexts/UserContext';

interface ModalProfilPictureI {
  profilePicture: ProfilePictureI;
}

const formatBytes = (a: number, b = 2) => {
  if (a === 0) return '0 Bytes'; const c = b < 0 ? 0 : b;
  const d = Math.floor(Math.log(a) / Math.log(1024));
  return `${parseFloat((a / 1024 ** d).toFixed(c))} ${['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]}`;
};

const ModalProfilPicture = ({
  profilePicture,
}: ModalProfilPictureI) => {
  const {
    createdAt,
    originalImage: {
      height,
      signedUrl,
      size,
      width,
    },
  } = profilePicture;
  const { setUser, user } = React.useContext(UserContext);
  const switchCurrent = () => {
    setUser((prevState) => {
      if (prevState) {
        const { currentProfilePicture } = prevState;
        if (currentProfilePicture && currentProfilePicture.id === profilePicture.id) {
          return {
            ...prevState,
            currentProfilePicture: null,
            currentProfilePictureId: null,
          };
        }
        return {
          ...prevState,
          currentProfilePicture: profilePicture,
          currentProfilePictureId: profilePicture.id,
        };
      }
      return null;
    });
  };
  const current = user
    ? user.currentProfilePictureId === profilePicture.id
    : null;
  return (
    <div>
      <img src={signedUrl} alt='image' />
      <p>
        upload at
      </p>
      <p
        data-testid='uploadAtText'
      >
        {` ${moment(createdAt).format('MMMM Do YYYY')}`}
      </p>
      <p>
        weight:
      </p>
      <p
        data-testid='weightText'
      >
        {formatBytes(size)}
      </p>
      <p>
        size:
      </p>
      <p
        data-testid='sizeText'
      >
        {`${width} x ${height} px`}
      </p>
      <button
        data-testid='modalProfilePictureButton'
        onClick={() => switchCurrent()}
      >
        {current ? 'remove profile picture' : 'use as profile picture'}
      </button>
      <button>
        download image
      </button>
    </div>
  );
};

export default ModalProfilPicture;
