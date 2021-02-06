import * as React from 'react';

import Modal from '#components/Modal';

import { UserContext } from '#contexts/UserContext';

import { ProfilePictureI } from '#helpers/interfaces';

import ModalProfilePicture from './ModalProfilePicture';

interface ProfilePictureComponentI {
  profilePicture: ProfilePictureI;
}

const ProfilePicture = ({
  profilePicture,
}: ProfilePictureComponentI) => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const { setUser } = React.useContext(UserContext);
  const handleClose = () => {
    setOpenModal(false);
  };
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
      <Modal
        open={openModal}
        handleClose={handleClose}
      >
        <ModalProfilePicture
          profilePicture={profilePicture}
        />
      </Modal>
    </div>
  );
};

export default ProfilePicture;
