import * as React from 'react';

import Modal from '#components/Modal';

import ModalProfilePicture from './ModalProfilePicture';

interface ProfilePictureComponentI {
  profilePicture: ProfilePictureI;
}

const ProfilePicture = ({
  profilePicture,
}: ProfilePictureComponentI) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const handleClose = () => {
    setOpenModal(false);
  };
  const switchCurrent = () => {};
  return (
    <div
      data-testid='profilePicture'
    >
      <button
        data-testid='profilePictureButton'
        onClick={() => switchCurrent()}
      />
      <button
        onClick={() => setOpenModal((nextState) => !nextState)}
      >
        <img
          alt='profile picture'
          src={profilePicture.originalImage.signedUrl}
        />
      </button>
      <Modal.Portal
        open={openModal}
        handleClose={handleClose}
      >
        <ModalProfilePicture
          profilePicture={profilePicture}
        />
      </Modal.Portal>
    </div>
  );
};

export default ProfilePicture;
