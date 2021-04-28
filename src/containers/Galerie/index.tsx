import * as React from 'react';

import { GalerieProvider } from '#contexts/galerieContext';

import Body from './Body';
import Header from './Header';

import {
  Container,
} from './styles';

const Galerie = () => {
  const [fixedMenu, setFixedMenu] = React.useState<boolean>(false);

  return (
    <GalerieProvider>
      <Container>
        <Header
          setFixedMenu={setFixedMenu}
        />
        <Body
          fixedMenu={fixedMenu}
        />
      </Container>
    </GalerieProvider>
  );
};

export default Galerie;
