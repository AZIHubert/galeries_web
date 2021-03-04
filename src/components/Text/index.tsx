import * as React from 'react';

import { P } from './styles';

interface StyleI {
  fontSize?: number;
  lineHeight?: number | 'normal';
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  textAlign?: style.TextAlign;
}

interface TextI {
  color?: style.Color;
  fontStyle?: style.FontStyle;
  fontWeight?: style.FontWeight;
  styles?: StyleI;
  stylesMobile?: StyleI;
  stylesTablet?: StyleI;
  stylesLaptop?: StyleI;
  stylesLaptopL?: StyleI;
  testId?: string;
}

const Text: React.FC<TextI> = ({
  children,
  color = 'black',
  fontStyle = 'normal',
  fontWeight = 'normal',
  styles,
  stylesMobile,
  stylesTablet,
  stylesLaptop,
  stylesLaptopL,
  testId,
}) => (
  <P
    color={color}
    fontStyle={fontStyle}
    fontWeight={fontWeight}
    testId={testId}
    styles={styles}
    stylesMobile={stylesMobile}
    stylesLaptop={stylesLaptop}
    stylesLaptopL={stylesLaptopL}
    stylesTablet={stylesTablet}
  >
    {children}
  </P>
);

export default Text;
