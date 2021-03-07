import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

import useProgressiveImage from '#hooks/useProgressiveImage';

import {
  Container,
  Fader,
  Img,
} from './styles';

interface ImageI {
  alt?: string;
  original: string;
  pending?: string;
}

const Image = ({
  alt = 'progressive image',
  original,
  pending,
}: ImageI) => {
  const imageRef = React.useRef<HTMLDivElement | null>(null);
  const loading = useProgressiveImage(original, imageRef, true);

  return (
    <Container
      ref={imageRef}
      uri={pending}
    >
      <CSSTransition
        classNames='fade'
        in={loading}
        timeout={300}
        unmountOnExit
      >
        <Fader>
          <Img
            alt={alt}
            src={original}
          />
        </Fader>
      </CSSTransition>
    </Container>
  );
};

export default Image;
