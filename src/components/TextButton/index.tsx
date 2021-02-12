import * as React from 'react';

import {
  Button,
  Container,
} from './styles';

type jJustifyContent = 'center' | 'end' | 'flex-end' | 'flex-start' | 'normal' | 'right' | 'safe' | 'space-around' | 'space-evenly' | 'start' | 'stretch' | 'unsafe';

interface TextButtonI {
  disabled?: boolean;
  fontSize?: number;
  fontSizeL?: number;
  justifyContent?: jJustifyContent;
  marginBottom?: number;
  marginTop?: number;
  onClick: () => void
  testId?: string;
  text: string;
  textButton: string;
}

const TextButton = ({
  disabled = false,
  fontSize = 1,
  fontSizeL = 1,
  justifyContent = 'flex-start',
  marginBottom = 0,
  marginTop = 0,
  onClick,
  testId,
  text,
  textButton,
}: TextButtonI) => (
  <Container
    fontSize={fontSize}
    fontSizeL={fontSizeL}
    justifyContent={justifyContent}
    marginBottom={marginBottom}
    marginTop={marginTop}
  >
    <p>
      {`${text} `}
      <Button
        onClick={() => {
          if (!disabled) {
            onClick();
          }
        }}
        testId={testId}
      >
        {textButton}
      </Button>
      .
    </p>
  </Container>
);

export default TextButton;
