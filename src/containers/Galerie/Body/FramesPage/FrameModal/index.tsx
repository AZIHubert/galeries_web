import arrayMove from 'array-move';
import * as React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Button from '#components/Button';
import Modal from '#components/Modal';
import Text from '#components/Text';

import theme from '#helpers/theme';

import {
  postFrame,
  resetFrame,
} from '#store/actions';
import {
  framesStatusSelector,
} from '#store/selectors';

import SortableImageList from './SortableImageList';

import {
  AddButton,
  AddFrameButtonContainer,
  FileInput,
} from './styled';

interface FrameModalI {
  handleClose: () => void;
}

const FrameModal = ({
  handleClose,
}: FrameModalI) => {
  const dispatch = useDispatch();
  const { id: galerieId } = useParams<{ id: string }>();
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const frameStatus = useSelector(framesStatusSelector(galerieId));
  const [imagesLimitReach, setImagesLimitReach] = React.useState<boolean>(false);
  const [posting, setPosting] = React.useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = React.useState<Array<{
    file: File,
    id: string,
    image: string,
  }>>([]);

  React.useEffect(() => {
    if (frameStatus === 'success' && posting) {
      handleClose();
    }
  }, [
    frameStatus,
    posting,
  ]);

  React.useEffect(() => () => {
    dispatch(
      resetFrame(),
    );
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

  const handleAddImages = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePostFrame = () => {
    setPosting(true);
    const formData = new FormData();
    selectedFiles.forEach(({ file }) => {
      formData.append('images', file, file.name);
    });
    dispatch(
      postFrame({
        images: formData,
        galerieId,
      }),
    );
  };

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    const newSelectedFile = arrayMove(selectedFiles, oldIndex, newIndex);
    setSelectedFiles(newSelectedFile);
  };

  const removeFile = React.useCallback((id: string) => {
    setSelectedFiles((prevState) => [
      ...prevState.filter((selectedFile) => selectedFile.id !== id),
    ]);
  }, []);

  return (
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
          fontSize: 0.8,
          marginBottom: 20,
        }}
      >
        you can only select at most 6 pictures
      </Text>
      <FileInput
        accept="image/*"
        data-testid='inputFile'
        multiple
        onChange={addFile}
        ref={fileInputRef}
        type="file"
      />
      {selectedFiles.length < 6 ? (
        <AddButton
          onClick={handleAddImages}
        >
          <AiOutlinePlus
            color={theme.colors.secondary}
            size={20}
          />
        </AddButton>
      ) : null}
      {selectedFiles.length ? (
        <AddFrameButtonContainer>
          <Button.Default
            disabled={frameStatus === 'posting'}
            onClick={handlePostFrame}
            styles={{
              marginBottom: 30,
            }}
            title='Add a new frame'
            type='button'
          />
        </AddFrameButtonContainer>
      ) : null}
      <SortableImageList
        axis='xy'
        distance={1}
        helperClass='sortableHelper'
        items={selectedFiles}
        onSortEnd={onSortEnd}
        removeFile={removeFile}
      />
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
  );
};

export default FrameModal;
