import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Modal from '#components/Modal';
import Spinner from '#components/Spinner';

import { GalerieContext } from '#contexts/galerieContext';

import { framesStatusSelector } from '#store/selectors';

import AddFrameButton from './AddFrameButton';
import Frame from './Frame';
import FrameModal from './FrameModal';

import {
  Container,
} from './styles';

const FramesPage = () => {
  const { galerie } = React.useContext(GalerieContext);
  const { id } = useParams<{ id: string }>();
  const framesStatus = useSelector(framesStatusSelector(id));
  const [open, setOpen] = React.useState<boolean>(false);

  const isFetching = React.useMemo(
    () => framesStatus === 'fetching',
    [framesStatus],
  );

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
      <Spinner
        show={isFetching}
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
