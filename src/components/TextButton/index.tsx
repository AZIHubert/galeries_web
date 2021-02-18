import * as React from 'react';

import {
  Button,
  Container,
} from './styles';

type jJustifyContent = 'center' | 'end' | 'flex-end' | 'flex-start' | 'normal' | 'right' | 'safe' | 'space-around' | 'space-evenly' | 'start' | 'stretch' | 'unsafe';

interface TextButtonI {
  buttonTestId?: string;
  containerTestId?: string;
  disabled?: boolean;
  fontSize?: number;
  fontSizeL?: number;
  justifyContent?: jJustifyContent;
  marginBottom?: number;
  marginTop?: number;
  onClick?: () => void;
  text: string;
  textButton: string;
}

const TextButton = ({
  buttonTestId,
  disabled = false,
  fontSize = 1,
  fontSizeL,
  justifyContent = 'flex-start',
  marginBottom = 0,
  marginTop = 0,
  onClick,
  containerTestId,
  text,
  textButton,
}: TextButtonI) => (
  <Container
    fontSize={fontSize}
    fontSizeL={fontSizeL}
    justifyContent={justifyContent}
    marginBottom={marginBottom}
    marginTop={marginTop}
    testId={containerTestId}
  >
    <p>
      {`${text} `}
      <Button
        onClick={() => {
          if (!disabled && onClick) {
            onClick();
          }
        }}
        testId={buttonTestId}
      >
        {textButton}
      </Button>
      .
    </p>
  </Container>
);

export default TextButton;
