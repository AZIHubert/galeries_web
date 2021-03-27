import * as React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import Modal from '#components/Modal';

import themeColor from '#helpers/theme';

import FrameModal from './FrameModal';

import {
  AddButton,
  Container,
} from './styles';

const FramesPage = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <AddButton
        onClick={() => setOpen(true)}
      >
        <AiOutlinePlus
          color={themeColor.colors.secondary}
          size={20}
        />
      </AddButton>
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
