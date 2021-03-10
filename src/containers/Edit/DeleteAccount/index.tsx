import * as React from 'react';
import { useSelector } from 'react-redux';

import Button from '#components/Button';
import Modal from '#components/Modal';
import Text from '#components/Text';

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
      <Text
        styles={{
          fontSize: 0.8,
          marginBottom: 20,
        }}
      >
        Once you delete your account, there is no going back. Please be certain.
      </Text>
      <Button.Default
        danger
        onClick={() => setOpenModal((nextState) => !nextState)}
        title='Delete your account'
        styles={{
          marginTop: 20,
        }}
        variant='secondary'
      />
      <Modal.Portal
        modalTestId='modal'
        open={openModal}
        handleClose={handleClose}
      >
        <Modal.Container
          variant='danger'
        >
          <ModalDelete />
        </Modal.Container>
      </Modal.Portal>
    </div>
  );
};

export default DeleteAccount;
