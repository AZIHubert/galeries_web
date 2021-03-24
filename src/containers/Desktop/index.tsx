import * as React from 'react';

import Footer from '#containers/Footer';

import GaleriesContainer from './GaleriesContainer';

import {
  Container,
} from './styles';

const Desktop = () => (
  <Container>
    <GaleriesContainer />
    <Footer />
  </Container>
);

export default Desktop;
