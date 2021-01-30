import * as React from 'react';

import Modal from '#components/Modal';

const PopupProfile = () => {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <>
      <div
        data-testid='popupProfil'
      >
        <button>
          <img
            alt='profile picture'
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
        <div
          data-testid='ticketModal'
        />
      </Modal>
    </>
  );
};

export default PopupProfile;
