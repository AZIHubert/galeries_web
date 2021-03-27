import * as React from 'react';
import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';

import Modal from '#components/Modal';

import mediaQueries from '#helpers/mediaQueries';
import themeColor from '#helpers/theme';

import FrameModal from './FrameModal';

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

const FramesPage = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const [selectedFiles, setSelectedFiles] = React.useState<Array<{
    file: File,
    id: string,
    image: string,
  }>>([]);
  const [imagesLimitReach, setImagesLimitReach] = React.useState<boolean>(false);

  const removeFile = React.useCallback((id: string) => {
    setSelectedFiles((prevState) => [
      ...prevState.filter((selectedFile) => selectedFile.id !== id),
    ]);
  }, []);

  const addFile = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target as HTMLInputElement;
    if (element.files) {
      if (selectedFiles.length <= 6) {
        setImagesLimitReach(false);
        setSelectedFiles((prevState) => {
          if (element.files && (element.files.length + prevState.length) <= 6) {
            const normalizedFiles = Object.values(element.files).map((file) => ({
              file,
              id: uuidv4(),
              image: URL.createObjectURL(file),
            }));
            element.value = '';
            return [
              ...normalizedFiles,
              ...prevState,
            ];
          }
          setImagesLimitReach(true);
          return prevState;
        });
      } else {
        setImagesLimitReach(true);
      }
    }
  }, []);

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
          addFile={addFile}
          imagesLimitReach={imagesLimitReach}
          removeFile={removeFile}
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
        />
      </Modal.Portal>
    </Container>
  );
};

export default FramesPage;
