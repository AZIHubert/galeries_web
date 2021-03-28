import * as React from 'react';

import Carousel from './Carousel';
import Footer from './Footer';
import Header from './Header';

import {
  Container,
} from './styles';

interface FrameContainerI {
  frame: FrameI
}

const Frame = ({
  frame: {
    id,
    createdAt,
    galeriePictures,
    likes,
    user,
  },
}: FrameContainerI) => (
  <Container>
    <Header
      user={user}
    />
    <Carousel
      galeriePictures={galeriePictures}
      frameId={id}
    />
    <Footer
      createdAt={createdAt}
      likes={likes}
    />
  </Container>
);

export default Frame;
