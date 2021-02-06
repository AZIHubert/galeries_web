import * as React from 'react';

import Modal from '#components/Modal';

import { ProfilePictureI } from '#helpers/interfaces';

import ModalProfilePicture from './ModalProfilePicture';

interface ProfilePictureComponentI {
  current?: boolean;
  profilePicture: ProfilePictureI;
  switchCurrent: (pp: ProfilePictureI) => void
}

const ProfilePicture = ({
  current = false,
  profilePicture,
  switchCurrent,
}: ProfilePictureComponentI) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <div
      data-testid='profilePicture'
    >
      <button
        data-testid='profilePictureButton'
        onClick={() => switchCurrent(profilePicture)}
      />
      <button
        onClick={() => setOpenModal((nextState) => !nextState)}
      >
        <img
          alt='profile picture'
          src={profilePicture.originalImage.signedUrl}
        />
      </button>
      <Modal
        open={openModal}
        handleClose={handleClose}
      >
        <ModalProfilePicture
          current={current}
          profilePicture={profilePicture}
          switchCurrent={switchCurrent}
        />
      </Modal>
    </div>
  );
};

export default ProfilePicture;
