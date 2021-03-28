import * as React from 'react';

import Modal from '#components/Modal';

import { GalerieContext } from '#contexts/galerieContext';

import FrameModal from './FrameModal';

import {
  Container,
} from './styles';

import AddFrameButton from './AddFrameButton';
import Frame from './Frame';

const FramesPage = () => {
  const { galerie } = React.useContext(GalerieContext);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    if (galerie) {
      setOpen(true);
    }
  };

  const frames = galerie ? galerie.frames.frames : {};

  return (
    <Container>
      <div>
        {!!galerie && Object.keys(frames).sort(
          (a, b) => (
            new Date(frames[b].createdAt).getTime()
        - new Date(frames[a].createdAt).getTime()
          ),
        ).map((index) => (
          <Frame
            key={frames[index].id}
            frame={frames[index]}
          />
        ))}
      </div>
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
