import * as React from 'react';

import Carrousel from './Carrousel';
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
    <Carrousel
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
