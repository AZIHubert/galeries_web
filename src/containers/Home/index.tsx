import * as React from 'react';

import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import {
  BackgroundImage,
  Container,
} from './Styles';

const Home = () => (
  <>
    <Header />
    <Container>
      <Body />
      <Footer />
    </Container>
    <BackgroundImage />
  </>
);

export default Home;
