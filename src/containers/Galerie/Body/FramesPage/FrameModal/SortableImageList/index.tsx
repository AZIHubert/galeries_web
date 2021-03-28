import * as React from 'react';
import { useParams } from 'react-router-dom';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import {
  useSelector,
} from 'react-redux';
import BounceLoader from 'react-spinners/BounceLoader';
import { CSSTransition } from 'react-transition-group';

import theme from '#helpers/theme';

import {
  framesStatusSelector,
} from '#store/selectors';

import {
  Container,
  Fader,
  Image,
  ImageContainer,
  SpinnerContainer,
} from './styles';

const SortableItem = SortableElement(({ value, handleClick }: {
  value: {
    file: File;
    image: string;
    id: string;
  },
  handleClick: () => void;
}) => {
  const { id } = useParams<{ id: string }>();
  const frameStatus = useSelector(framesStatusSelector(id));

  return (
    <ImageContainer>
      <Image
        posting={frameStatus === 'posting'}
        onClick={handleClick}
        url={value.image}
      />
      <CSSTransition
        classNames='fade'
        in={frameStatus === 'posting'}
        timeout={300}
        unmountOnExit
      >
        <Fader>
          <SpinnerContainer>
            <BounceLoader
              color={theme.colors.primary}
              size={60}
            />
          </SpinnerContainer>
        </Fader>
      </CSSTransition>
    </ImageContainer>
  );
});

export default SortableContainer(({
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
  <Container>
    {items.map((
      value,
      index: number,
    ) => (
      <SortableItem
        handleClick={() => removeFile(value.id)}
        index={index}
        key={`item-${value.id}`}
        value={value}
      />
    ))}
  </Container>
));
