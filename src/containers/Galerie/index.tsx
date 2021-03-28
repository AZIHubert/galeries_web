import * as React from 'react';

import { GalerieProvider } from '#contexts/galerieContext';

import Body from './Body';
import Header from './Header';

import {
  Container,
} from './styles';

const Galerie = () => (
  <GalerieProvider>
    <Container>
      <Header />
      <Body />
    </Container>
  </GalerieProvider>
);

export default Galerie;
