import * as React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import Button from '#components/Button';
import Modal from '#components/Modal';
import Text from '#components/Text';

import theme from '#helpers/theme';

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
  removeImage: (id: string) => void;
  selectedFile: {
    file: File;
    image: string;
    id: string;
  }[];
  setSelectedFile: React.Dispatch<React.SetStateAction<{
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
  removeImage,
}: {
  items: {
    file: File;
    image: string;
    id: string;
  }[];
  removeImage: (id: string) => void;
}) => (
  <ImageContainer>
    {items.map((value, index: number) => (
      <SortableItem
        handleClick={() => removeImage(value.id)}
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
  removeImage,
  selectedFile,
  setSelectedFile,
}: FrameModalI) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    const newSelectedFile = arrayMove(selectedFile, oldIndex, newIndex);
    setSelectedFile(newSelectedFile);
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
      {selectedFile.length < 6 ? (
        <AddButton
          onClick={handleClick}
        >
          <AiOutlinePlus
            color={theme.colors.secondary}
            size={20}
          />
        </AddButton>
      ) : null}
      {selectedFile.length ? (
        <AddFrameButtonContainer>
          <Button.Default
            disabled={false}
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
        items={selectedFile}
        onSortEnd={onSortEnd}
        removeImage={removeImage}
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
