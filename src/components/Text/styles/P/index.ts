import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

type Color = 'black' | 'danger' | 'primary' | 'secondary' | 'tertiary' | 'white';
type FontStyle = 'lighter' | 'normal';
type FontWeight = 'bold' | 'normal';
type TextAlign = 'center' | 'justify' | 'left' | 'right';

interface PI {
  color?: Color;
  fontSize?: number;
  fontSizeL?: number;
  fontStyle?: FontStyle;
  fontWeight?: FontWeight;
  textAlign?: TextAlign;
}

const P = styled.p<PI>`
  color: ${({
    color,
    theme,
  }) => (
    color ? theme.colors[color] : theme.colors.primary
  )};
  font-size: ${({ fontSize }) => `${fontSize}rem`};
  font-style: ${({ fontStyle }) => (
    fontStyle || 'normal'
  )};
  font-weight: ${({ fontWeight }) => (
    fontWeight || 'normal'
  )};
  text-align: ${({ textAlign }) => (
    textAlign || 'left'
  )};
  @media ${mediaQueries.laptopL} {
    font-size: ${({
    fontSize,
    fontSizeL,
  }) => {
    const fontS = fontSizeL || fontSize;
    return `${fontS}rem`;
  }}
  }
`;

P.defaultProps = {
  color: 'primary',
  fontSize: 1,
  fontStyle: 'normal',
  fontWeight: 'normal',
  textAlign: 'left',
};

export default P;
