import * as React from 'react';

import { P } from './styles';

type Color = 'black' | 'danger' | 'primary' | 'secondary' | 'tertiary' | 'white';
type FontStyle = 'lighter' | 'normal';
type FontWeight = 'bold' | 'normal';
type TextAlign = 'center' | 'justify' | 'left' | 'right';

interface TextI {
  color?: Color;
  fontSize?: number;
  fontStyle?: FontStyle;
  fontWeight?: FontWeight;
  textAlign?: TextAlign;
}

const Text: React.FC<TextI> = ({
  children,
  color = 'primary',
  fontSize = 1,
  fontStyle = 'normal',
  fontWeight = 'normal',
  textAlign = 'left',
}) => (
  <P
    color={color}
    fontSize={fontSize}
    fontStyle={fontStyle}
    fontWeight={fontWeight}
    textAlign={textAlign}
  >
    {children}
  </P>
);

export default Text;
