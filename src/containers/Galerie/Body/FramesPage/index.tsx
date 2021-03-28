import * as React from 'react';

import Modal from '#components/Modal';

import FrameModal from './FrameModal';

import {
  Container,
} from './styles';

import AddFrameButton from './AddFrameButton';

const FramesPage = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <Container>
      <AddFrameButton
        onClick={handleOpen}
      />
      <Modal.Portal
        handleClose={handleClose}
        open={open}
      >
        <FrameModal
          handleClose={handleClose}
        />
      </Modal.Portal>
    </Container>
  );
};

export default FramesPage;
