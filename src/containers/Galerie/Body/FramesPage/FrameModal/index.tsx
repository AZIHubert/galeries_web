import * as React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  useDispatch,
} from 'react-redux';
import {
  useParams,
} from 'react-router-dom';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import Button from '#components/Button';
import Modal from '#components/Modal';
import Text from '#components/Text';

import theme from '#helpers/theme';

import {
  postFrame,
} from '#store/actions';

import {
  AddButton,
  AddFrameButtonContainer,
  FileInput,
  Image,
  ImageContainer,
} from './styled';

interface FrameModalI {
  addFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagesLimitReach: boolean,
  removeFile: (id: string) => void;
  selectedFiles: {
    file: File;
    image: string;
    id: string;
  }[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<{
    file: File;
    id: string;
    image: string;
  }[]>>
}

const SortableItem = SortableElement(({ value, handleClick }: {
  value: {
    file: File;
    image: string;
    id: string;
  },
  handleClick: () => void;
}) => <Image
  url={value.image}
  onClick={handleClick}
/>);

const SortableList = SortableContainer(({
  items,
  removeFile,
}: {
  items: {
    file: File;
    image: string;
    id: string;
  }[];
  removeFile: (id: string) => void;
}) => (
  <ImageContainer>
    {items.map((value, index: number) => (
      <SortableItem
        handleClick={() => removeFile(value.id)}
        key={`item-${value.id}`}
        index={index}
        value={value}
      />
    ))}
  </ImageContainer>
));

const FrameModal = ({
  addFile,
  imagesLimitReach,
  removeFile,
  selectedFiles,
  setSelectedFiles,
}: FrameModalI) => {
  const dispatch = useDispatch();
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const { id: galerieId } = useParams<{ id: string }>();

  const handleAddImages = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePostFrame = () => {
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
            disabled={false}
            onClick={handlePostFrame}
            styles={{
              marginBottom: 30,
            }}
            title='Add a new frame'
            type='button'
          />
        </AddFrameButtonContainer>
      ) : null}
      <SortableList
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

export default React.memo(FrameModal);
