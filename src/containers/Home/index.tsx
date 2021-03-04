import * as React from 'react';

import Footer from '#containers/Footer';
import Header from '#containers/Header';

import Body from './Body';

import {
  BackgroundImage,
  Container,
} from './Styles';

const Home = () => (
  <>
    <Header.Home />
    <Container>
      <Body />
      <Footer />
    </Container>
    <BackgroundImage />
  </>
);

export default Home;
