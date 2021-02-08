import * as React from 'react';

import {
  Button,
  Container,
} from './styles';

type jJustifyContent = 'center' | 'end' | 'flex-end' | 'flex-start' | 'normal' | 'right' | 'safe' | 'space-around' | 'space-evenly' | 'start' | 'stretch' | 'unsafe';

interface TextButtonI {
  disabled?: boolean;
  fontSize?: number;
  justifyContent?: jJustifyContent;
  marginBottom?: number;
  marginTop?: number;
  text: string;
  textButton: string;
  onClick: () => void
}

const TextButton = ({
  disabled = false,
  fontSize = 1,
  justifyContent = 'flex-start',
  marginBottom = 0,
  marginTop = 0,
  onClick,
  text,
  textButton,
}: TextButtonI) => (
  <Container
    fontSize={fontSize}
    justifyContent={justifyContent}
    marginBottom={marginBottom}
    marginTop={marginTop}
  >
    <p>
      {`${text} `}
      <Button
        data-testid='switchToLogin'
        onClick={() => {
          if (!disabled) {
            onClick();
          }
        }}
      >
        {textButton}
      </Button>
      .
    </p>
  </Container>
);

export default TextButton;
