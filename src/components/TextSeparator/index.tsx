import * as React from 'react';

import { Container } from './styled';

interface TextSeparatorI {
  marginBottom?: number;
  marginTop?: number;
  text: string;
}

const TextSeparator = ({
  marginBottom = 0,
  marginTop = 0,
  text,
}: TextSeparatorI) => (
  <Container
    marginBottom={marginBottom}
    marginTop={marginTop}
  >
    {text}
  </Container>
);

export default TextSeparator;
