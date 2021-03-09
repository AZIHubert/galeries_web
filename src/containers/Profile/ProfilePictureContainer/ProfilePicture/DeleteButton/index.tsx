import * as React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import Modal from '#components/Modal';
import Text from '#components/Text';
import ButtonLol from '#components/Button';

import { ProfilePictureContext } from '#contexts/ProfilePictureContext';

import theme from '#helpers/theme';

import { deleteProfilePicture } from '#store/actions';

import {
  Button,
} from './styles';

interface DeleteButtonI {
  id: string;
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DeleteButton = ({
  id,
}: DeleteButtonI) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState<boolean>(false);
  const {
    deletingImage,
    puttingImage,
    setDeletingImage,
  } = React.useContext(ProfilePictureContext);

  const handleClick = () => {
    if (!deletingImage && !puttingImage) {
      setDeletingImage(id);
      dispatch(deleteProfilePicture({ id }));
      setOpen(false);
    }
  };
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  console.log('from button', open);

  return (
    <Button>
      <AiOutlineDelete
        color={theme.colors.secondary}
        onClick={handleOpen}
        size={20}
      />
      <Modal.Portal
        handleClose={handleClose}
        open={open}
      >
        <Modal.Container
          variant='danger'
        >
          <Text
            color='danger'
            styles={{
              fontSize: 1.3,
              marginBottom: 40,
            }}
          >
            Are you sure you want to delete this profile picture?
          </Text>
          <ButtonContainer>
            <ButtonLol.Default
              danger
              title='yes'
              variant='primary'
              onClick={handleClick}
            />
            <ButtonLol.Default
              danger
              title='no'
              variant='secondary'
              onClick={handleClose}
            />
          </ButtonContainer>
        </Modal.Container>
      </Modal.Portal>
    </Button>
  );
};

export default DeleteButton;
