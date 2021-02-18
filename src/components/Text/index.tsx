import * as React from 'react';

import { P } from './styles';

type Color = 'black' | 'danger' | 'primary' | 'secondary' | 'tertiary' | 'white';
type FontStyle = 'lighter' | 'normal';
type FontWeight = 'bold' | 'normal';
type TextAlign = 'center' | 'justify' | 'left' | 'right';

interface TextI {
  color?: Color;
  fontSize?: number;
  fontSizeL?: number;
  fontStyle?: FontStyle;
  fontWeight?: FontWeight;
  testId?: string;
  textAlign?: TextAlign;
}

const Text: React.FC<TextI> = ({
  children,
  color = 'black',
  fontSize = 1,
  fontSizeL,
  fontStyle = 'normal',
  fontWeight = 'normal',
  testId,
  textAlign = 'left',
}) => (
  <P
    color={color}
    fontSize={fontSize}
    fontSizeL={fontSizeL}
    fontStyle={fontStyle}
    fontWeight={fontWeight}
    testId={testId}
    textAlign={textAlign}
  >
    {children}
  </P>
);

export default Text;
