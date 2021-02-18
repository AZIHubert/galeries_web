import * as React from 'react';

import { Container } from './styled';

interface TextSeparatorI {
  marginBottom?: number;
  marginBottomL?: number;
  marginTop?: number;
  marginTopL?: number;
  text: string;
}

const TextSeparator = ({
  marginBottom = 0,
  marginBottomL,
  marginTop = 0,
  marginTopL,
  text,
}: TextSeparatorI) => (
  <Container
    marginBottom={marginBottom}
    marginBottomL={marginBottomL}
    marginTop={marginTop}
    marginTopL={marginTopL}
  >
    {text}
  </Container>
);

export default TextSeparator;
