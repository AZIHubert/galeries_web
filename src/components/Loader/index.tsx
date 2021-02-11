import * as React from 'react';

import logo from '#ressources/svg/logoG.svg';

import {
  Container,
  Image,
} from './styles';

const Loader = () => (
  <Container>
    <Image
      alt='Galeries logo'
      src={logo}
    />
  </Container>
);

export default Loader;
