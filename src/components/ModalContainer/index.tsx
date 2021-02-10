import * as React from 'react';

import {
  Background,
  Container,
  InnerContainer,
  Title,
} from './styled';

type TextAlign = 'center' | 'end' | 'justify' | 'justify-all' | 'left' | 'match-parent' | 'right' | 'start';

interface ModalContainerI {
  open?: boolean;
  testId?: string;
  title?: string;
  titleTextAlign?: TextAlign;
}

const ModalContainer: React.FC<ModalContainerI> = ({
  children,
  testId,
  title,
  titleTextAlign,
}) => (
  <Container
    testId={testId}
  >
    <InnerContainer>
      {title ? (
        <Title
          textAlign={titleTextAlign}
        >
          {title}
        </Title>
      ) : null}
      {children}
    </InnerContainer>
    <Background />
  </Container>
);

export default ModalContainer;
