import * as React from 'react';

import { Container } from './styled';

interface StylesI {
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
}

interface TextSeparatorI {
  styles?: StylesI;
  stylesMobile?: StylesI;
  stylesTablet?: StylesI;
  stylesLaptop?: StylesI;
  stylesLaptopL?: StylesI;
  text: string;
}

const TextSeparator = ({
  styles,
  stylesMobile,
  stylesTablet,
  stylesLaptop,
  stylesLaptopL,
  text,
}: TextSeparatorI) => (
  <Container
    styles={styles}
    stylesMobile={stylesMobile}
    stylesLaptop={stylesLaptop}
    stylesLaptopL={stylesLaptopL}
    stylesTablet={stylesTablet}
  >
    {text}
  </Container>
);

export default TextSeparator;
