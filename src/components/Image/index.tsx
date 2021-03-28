import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

import useProgressiveImage from '#hooks/useProgressiveImage';

import {
  Container,
  Fader,
  Img,
} from './styles';

type Mode = 'cover' | 'contain';

interface ImageI {
  alt?: string;
  mode?: Mode;
  original: string;
  pending?: string;
}

const Image = ({
  alt = 'progressive image',
  mode = 'cover',
  original,
  pending,
}: ImageI) => {
  const imageRef = React.useRef<HTMLDivElement | null>(null);
  const loading = useProgressiveImage(original, imageRef, true);

  return (
    <Container
      mode={mode}
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
            mode={mode}
            src={original}
          />
        </Fader>
      </CSSTransition>
    </Container>
  );
};

export default Image;
