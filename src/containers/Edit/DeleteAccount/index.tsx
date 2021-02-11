import * as React from 'react';

import Modal from '#components/Modal';

import { LoadingContext } from '#contexts/LoadingContext';

import ModalDelete from './ModalDelete';

const DeleteAccount = () => {
  const { loading, setLoading } = React.useContext(LoadingContext);
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
        data-testid='buttonDeleteModal'
        onClick={() => setOpenModal((nextState) => !nextState)}
      />
      <Modal
        open={openModal}
        handleClose={handleClose}
      >
        <ModalDelete
          loading={loading}
          setLoading={setLoading}
        />
      </Modal>
    </div>
  );
};

export default DeleteAccount;
