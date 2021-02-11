import * as React from 'react';

import Body from './Body';
import Footer from './Footer';

import HeaderHome from '#containers/HeaderHome';

import { LoadingContext } from '#contexts/LoadingContext';

import {
  BackgroundImage,
  Container,
} from './Styles';

const Home = () => {
  const { setLoading } = React.useContext(LoadingContext);
  React.useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      <HeaderHome />
      <Container>
        <Body />
        <Footer />
      </Container>
      <BackgroundImage />
    </>
  );
};

export default Home;
