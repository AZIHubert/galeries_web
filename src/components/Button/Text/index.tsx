import * as React from 'react';

import {
  Button,
  Container,
} from './styles';

interface StylesI {
  fontSize?: number;
  justifyContent?: style.JustifyContent;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
}

interface TextButtonI {
  buttonTestId?: string;
  containerTestId?: string;
  disabled?: boolean;
  onClick?: () => void;
  styles?: StylesI;
  stylesMobile?: StylesI;
  stylesTablet?: StylesI;
  stylesLaptop?: StylesI;
  stylesLaptopL?: StylesI;
  text: string;
  textButton: string;
}

const TextButton = ({
  buttonTestId,
  containerTestId,
  disabled = false,
  onClick,
  styles,
  stylesMobile,
  stylesTablet,
  stylesLaptop,
  stylesLaptopL,
  text,
  textButton,
}: TextButtonI) => (
  <Container
    styles={styles}
    stylesMobile={stylesMobile}
    stylesLaptop={stylesLaptop}
    stylesLaptopL={stylesLaptopL}
    stylesTablet={stylesTablet}
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
