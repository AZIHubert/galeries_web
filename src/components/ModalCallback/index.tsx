import * as React from 'react';

import {
  Background,
  Container,
  InnerContainer,
} from './styles';

type Variant = 'error' | 'primary';

interface ModalCallbackI {
  text: string;
  variant?: Variant;
}

const ModalCallback = ({
  text,
  variant = 'primary',
}: ModalCallbackI) => (
  <Container>
    <InnerContainer
      variant={variant}
    >
      {text}
    </InnerContainer>
    <Background
      variant={variant}
    />
  </Container>
);

export default ModalCallback;
