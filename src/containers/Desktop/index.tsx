import * as React from 'react';
import { useSelector } from 'react-redux';

import Footer from '#containers/Footer';
import ScrollToTop from '#components/ScrollToTop';
import Spinner from '#components/Spinner';

import { galeriesStatusSelector } from '#store/selectors';

import GaleriesContainer from './GaleriesContainer';

import {
  Body,
  Container,
} from './styles';

const Desktop = () => {
  const galeriesStatus = useSelector(galeriesStatusSelector);
  const isFetching = React.useMemo(
    () => galeriesStatus === 'fetching',
    [galeriesStatus],
  );

  return (
    <Container>
      <Body>
        <GaleriesContainer />
      </Body>
      <Footer />
      <ScrollToTop />
      <Spinner
        show={isFetching}
      />
    </Container>
  );
};

export default Desktop;
