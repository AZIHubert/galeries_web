import * as React from 'react';

import {
  Container,
} from './styled';

interface ModalContainerI {
  containerTestId?: string;
  variant?: 'default' | 'danger';
}

const ModalContainer: React.FC<ModalContainerI> = ({
  children,
  variant = 'default',
}) => (
  <Container
    variant={variant}
  >
    {children}
  </Container>
);

export default ModalContainer;
