import * as React from 'react';

import { LogoGaleries } from '#ressources/svgComponents';

import {
  Container,
  Logo,
} from './styles';

const FullPageForm: React.FC<{}> = ({
  children,
}) => (
  <Container>
    <Logo>
      <LogoGaleries />
    </Logo>
    {children}
  </Container>
);

export default FullPageForm;
