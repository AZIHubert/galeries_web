import * as React from 'react';
import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';

import Modal from '#components/Modal';
import Text from '#components/Text';

import mediaQueries from '#helpers/mediaQueries';
import themeColor from '#helpers/theme';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const AddButton = styled.button`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 50%;
  bottom: 15px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  cursor: pointer;
  display: flex;
  height: 32px;
  justify-content: center;
  left: 25px;
  position: fixed;
  width: 32px;
  transition: ${({ theme }) => theme.transition.default};
  & svg {
    transition: ${({ theme }) => theme.transition.default};
  }
  &:focus {
    outline: none;
  }
  &:hover {
    transform: scale(1.04);
    & svg {
      transform: rotate(180deg) scale(0.96);
    }
  }
  @media ${mediaQueries.tablet} {
    left: 30px;
    bottom: 30px;
  }
  @media ${mediaQueries.laptopL} {
    bottom: 40px;
    height: 38px;
    left: 40px;
    padding: 12px;
    width: 38px;
  }
`;

const AddImageButton = styled.button`
  width: 25px;
  height: 25px;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.black};
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  right: 10px;
  bottom: 10px;
  &:focus {
    outline: none;
  }
`;

const AddImageContainer = styled.div`
  display: flex;
  min-height: 100px;
`;

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
        <Modal.Container>
          <Text
            color='primary'
            styles={{
              fontSize: 1.4,
            }}
          >
            Add a new frame
          </Text>
          <Text
            color='black'
            styles={{
              marginBottom: 20,
            }}
          >
            you can select at most 6 pictures
          </Text>
          <AddImageButton>
            <AiOutlinePlus
              color={themeColor.colors.secondary}
              size={15}
            />
          </AddImageButton>
          <AddImageContainer />
        </Modal.Container>
      </Modal.Portal>
    </Container>
  );
};

export default FramesPage;
