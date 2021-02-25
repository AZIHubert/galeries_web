import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface PI {
  color?: style.Color;
  fontSize?: number;
  fontSizeL?: number;
  fontStyle?: style.FontStyle;
  fontWeight?: style.FontWeight;
  testId?: string;
  textAlign?: style.TextAlign;
}

const P = styled.p.attrs<PI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<PI>`
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
  color: 'black',
  fontSize: 1,
  fontStyle: 'normal',
  fontWeight: 'normal',
  textAlign: 'left',
};

export default P;
