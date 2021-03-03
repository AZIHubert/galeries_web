import * as React from 'react';

import {
  Background,
  Container,
  InnerContainer,
} from './styled';

interface ModalContainerI {
  containerTestId?: string;
  title?: React.ReactNode;
}

const ModalContainer: React.FC<ModalContainerI> = ({
  children,
  containerTestId,
  title,
}) => (
  <Container
    testId={containerTestId}
  >
    <InnerContainer>
      {title}
      {children}
    </InnerContainer>
    <Background />
  </Container>
);

export default ModalContainer;
