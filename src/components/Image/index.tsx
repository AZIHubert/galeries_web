import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

import useProgressiveImage from '#hooks/useProgressiveImage';

import {
  Container,
  Fader,
  Img,
} from './styles';

type Mode = 'cover' | 'height' | 'width' | 'fill';

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
  const [hide, setHide] = React.useState<boolean>(true);

  return (
    <Container
      mode={mode}
      ref={imageRef}
      uri={pending}
    >
      <CSSTransition
        classNames='fade'
        in={loading}
        onEntered={() => setHide(false)}
        timeout={300}
      >
        <Fader
          mode={mode}
          hide={hide}
        >
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
