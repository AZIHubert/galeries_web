import * as React from 'react';

import Body from './Body';
import Footer from './Footer';
import HeaderHome from '#containers/HeaderHome';

import {
  BackgroundImage,
  Container,
} from './Styles';

const Home = () => (
  <>
    <HeaderHome />
    <Container>
      <Body />
      <Footer />
    </Container>
    <BackgroundImage />
  </>
);

export default Home;
