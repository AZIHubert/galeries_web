import * as React from 'react';

import {
  Background,
  Container,
  InnerContainer,
} from './styled';

interface ModalContainerI {
  containerTestId?: string;
  variant?: 'default' | 'danger';
  title?: React.ReactNode;
}

const ModalContainer: React.FC<ModalContainerI> = ({
  children,
  containerTestId,
  variant = 'default',
  title,
}) => (
  <Container
    testId={containerTestId}
  >
    <InnerContainer
      variant={variant}
    >
      {title}
      {children}
    </InnerContainer>
    <Background
      variant={variant}
    />
  </Container>
);

export default ModalContainer;
