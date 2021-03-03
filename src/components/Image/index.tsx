import * as React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import useProgressiveImage from '#hooks/useProgressiveImage';

interface ImageI {
  alt?: string;
  original: string;
  pending?: string;
}

interface ContainerI {
  uri?: string;
}

const Container = styled.div<ContainerI>`
  background-image: ${({ uri }) => (
    uri ? `url("${uri}")` : 'none'
  )};
  background-color: ${({
    theme,
    uri,
  }) => (
    uri ? theme.colors.secondary : 'none'
  )};
`;
const Img = styled.img`
  width: 100%;
`;
const Fader = styled.div`
  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: 500ms;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: 500ms;
  }
`;

const Image = ({
  alt,
  original,
  pending,
}: ImageI) => {
  const loading = useProgressiveImage(original);
  return (
    <Container
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
            alt={alt && 'progressive image'}
            src={original}
          />
        </Fader>
      </CSSTransition>
    </Container>
  );
};

export default Image;
