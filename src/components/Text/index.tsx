import * as React from 'react';

import { P } from './styles';

interface TextI {
  color?: style.Color;
  fontSize?: number;
  fontSizeL?: number;
  fontStyle?: style.FontStyle;
  fontWeight?: style.FontWeight;
  testId?: string;
  textAlign?: style.TextAlign;
  textAlignL?: style.TextAlign;
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
  textAlignL,
}) => (
  <P
    color={color}
    fontSize={fontSize}
    fontSizeL={fontSizeL}
    fontStyle={fontStyle}
    fontWeight={fontWeight}
    testId={testId}
    textAlign={textAlign}
    textAlignL={textAlignL}
  >
    {children}
  </P>
);

export default Text;
