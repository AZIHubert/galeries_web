import * as React from 'react';
import { useSelector } from 'react-redux';

import Modal from '#components/Modal';

import { loadingSelector } from '#store/selectors';

import ModalDelete from './ModalDelete';

const DeleteAccount = () => {
  const loading = useSelector(loadingSelector);
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const handleClose = () => {
    if (!loading) {
      setOpenModal(false);
    }
  };

  return (
    <div>
      <p>
        delete your account
      </p>
      <p>
        Once you delete your account, there is no going back. Please be certain.
      </p>
      <button
        onClick={() => setOpenModal((nextState) => !nextState)}
      />
      <Modal.Portal
        modalTestId='modal'
        open={openModal}
        handleClose={handleClose}
      >
        <ModalDelete />
      </Modal.Portal>
    </div>
  );
};

export default DeleteAccount;
