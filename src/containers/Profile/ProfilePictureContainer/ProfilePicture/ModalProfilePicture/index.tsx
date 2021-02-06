import moment from 'moment';
import * as React from 'react';

import { ProfilePictureI } from '#helpers/interfaces';

interface ModalProfilPictureI {
  current?: boolean;
  profilePicture: ProfilePictureI;
  switchCurrent: () => void
}

const formatBytes = (a: number, b = 2) => {
  if (a === 0) return '0 Bytes'; const c = b < 0 ? 0 : b;
  const d = Math.floor(Math.log(a) / Math.log(1024));
  return `${parseFloat((a / 1024 ** d).toFixed(c))} ${['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]}`;
};

const ModalProfilPicture = ({
  current = false,
  profilePicture: {
    createdAt,
    originalImage: {
      height,
      signedUrl,
      size,
      width,
    },
  },
  switchCurrent,
}: ModalProfilPictureI) => (
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
      data-testid='profilePictureButton'
      onClick={switchCurrent}
    >
      {current ? 'remove profile picture' : 'use as profile picture'}
    </button>
    <button>
      download image
    </button>
  </div>
);

export default ModalProfilPicture;
