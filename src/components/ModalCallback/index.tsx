import * as React from 'react';

import {
  Background,
  Container,
  InnerContainer,
} from './styles';

type Variant = 'error' | 'primary';

interface ModalCallbackI {
  backgroundTestId?: string;
  innerContainerTestId?: string;
  text: string;
  variant?: Variant;
}

const ModalCallback = ({
  backgroundTestId,
  innerContainerTestId,
  text,
  variant = 'primary',
}: ModalCallbackI) => (
  <Container>
    <InnerContainer
      testId={innerContainerTestId}
      variant={variant}
    >
      {text}
    </InnerContainer>
    <Background
      testId={backgroundTestId}
      variant={variant}
    />
  </Container>
);

export default ModalCallback;
