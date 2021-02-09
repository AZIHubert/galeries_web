import * as React from 'react';

import { LogoGaleries } from '#ressources/svgComponents';

import {
  CatchPhrase,
  Container,
  GaleriesLogo,
  Welcolme,
} from './styles';

const Body = () => (
  <Container>
    <div>
      <Welcolme>
        Welcome to
      </Welcolme>
      <GaleriesLogo>
        <LogoGaleries />
      </GaleriesLogo>
      <CatchPhrase>
        A web app to share
      </CatchPhrase>
      <CatchPhrase>
        pictures with
      </CatchPhrase>
      <CatchPhrase>
        your friends and family.
      </CatchPhrase>
    </div>
  </Container>
);

export default Body;
