import * as React from 'react';
import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';

import Button from '#components/Button';
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

const AddFrameButtonContainer = styled.div`
  width: 50%;
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
  min-height: 80px;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

const FileInput = styled.input`
  display: none;
`;

interface ImageI {
  url: string;
}

const Image = styled.div<ImageI>`
  background: ${({ url }) => `url(${url}) no-repeat center center`};
  background-size: cover;
  width: 33.33%;
  &::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const FramesPage = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const [selectedFile, setSelectedFile] = React.useState<Array<{image: File, id: string}>>([]);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [imagesLimitReach, setImagesLimitReach] = React.useState<boolean>(false);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeImage = (id: string) => {
    setSelectedFile((prevState) => [
      ...prevState.filter((image) => image.id !== id),
    ]);
  };

  const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target as HTMLInputElement;
    if (element.files) {
      if (selectedFile.length <= 6) {
        setImagesLimitReach(false);
        setSelectedFile((prevState) => {
          if (element.files && (element.files.length + prevState.length) <= 6) {
            const normalizedFiles = Object.values(element.files).map((file) => ({
              image: file,
              id: uuidv4(),
            }));
            element.value = '';
            return [
              ...normalizedFiles,
              ...prevState,
            ];
          }
          return prevState;
        });
      }
      if (element.files && (element.files.length + selectedFile.length) > 6) {
        setImagesLimitReach(true);
      }
    }
  };

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
          <FileInput
            accept="image/*"
            data-testid='inputFile'
            multiple
            onChange={addFile}
            ref={fileInputRef}
            type="file"
          />
          {selectedFile.length < 6 ? (
            <AddImageButton
              onClick={handleClick}
            >
              <AiOutlinePlus
                color={themeColor.colors.secondary}
                size={20}
              />
            </AddImageButton>
          ) : null}
          {selectedFile.length ? (
            <AddFrameButtonContainer>
              <Button.Default
                title='Add a new frame'
                disabled={false}
                type='button'
                styles={{
                  marginBottom: 30,
                }}
              />
            </AddFrameButtonContainer>
          ) : null}
          <AddImageContainer>
            {selectedFile.length ? (
              selectedFile.map((file) => (
                <Image
                  key={file.id}
                  url={URL.createObjectURL(file.image)}
                  onClick={() => removeImage(file.id)}
                />
              ))
            ) : null}
          </AddImageContainer>
          {imagesLimitReach && (
            <Text
              color='danger'
              styles={{
                fontSize: 0.8,
              }}
            >
              you tried to add more than 6 images
            </Text>
          )}
        </Modal.Container>
      </Modal.Portal>
    </Container>
  );
};

export default FramesPage;
