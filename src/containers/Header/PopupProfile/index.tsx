import * as React from 'react';

import Modal from '#components/Modal';
import defaultProfilePicture from '#ressources/svg/defaultProfilePicture.svg';

import ModalTicket from './ModalTicket';

const PopupProfile = () => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleClose = () => {
    if (!loading) {
      setOpenModal(false);
    }
  };
  return (
    <>
      <div
        data-testid='popupProfil'
      >
        <button>
          <img
            alt='profile picture'
            src={defaultProfilePicture}
          />
          <p>
              userName
          </p>
          <p>
              see your profile
          </p>
        </button>
        <button>
          <img
            alt='edit your information pictogram'
          />
          <p>
              Edit your informations
          </p>
        </button>
        <button
          data-testid='buttonTicketModal'
          onClick={() => setOpenModal((nextState) => !nextState)}
        >
          <img
            alt='send a ticket pictogram'
          />
          <p>
              Share your opinion? Find a bug?
          </p>
          <p>
              send a ticket
          </p>
        </button>
      </div>
      <Modal
        open={openModal}
        handleClose={handleClose}
      >
        <ModalTicket
          loading={loading}
          setLoading={setLoading}
        />
      </Modal>
    </>
  );
};

export default PopupProfile;
