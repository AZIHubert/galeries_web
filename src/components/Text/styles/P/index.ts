import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface StyleI {
  fontSize?: number;
  lineHeight?: number | 'normal';
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  textAlign?: style.TextAlign;
}

interface PI {
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
  font-size: ${({ styles }) => {
    if (styles && styles.fontSize) {
      return `${styles.fontSize}rem`;
    }
    return '1rem';
  }};
  font-style: ${({ fontStyle }) => (
    fontStyle || 'normal'
  )};
  font-weight: ${({ fontWeight }) => (
    fontWeight || 'normal'
  )};
  line-height: ${({ styles }) => {
    if (styles && styles.lineHeight) {
      const {
        lineHeight,
      } = styles;
      return `${lineHeight}rem`;
    }
    return 'normal';
  }};
  margin-bottom: ${({ styles }) => {
    if (styles && styles.marginBottom) {
      return `${styles.marginBottom}px`;
    }
    return '0px';
  }};
  margin-left: ${({ styles }) => {
    if (styles && styles.marginLeft) {
      return `${styles.marginLeft}px`;
    }
    return '0px';
  }};
  margin-right: ${({ styles }) => {
    if (styles && styles.marginRight) {
      return `${styles.marginRight}px`;
    }
    return '0px';
  }};
  margin-top: ${({ styles }) => {
    if (styles && styles.marginTop) {
      return `${styles.marginTop}px`;
    }
    return '0px';
  }};
  text-align: ${({ styles }) => {
    if (styles && styles.textAlign) {
      return `${styles.textAlign}`;
    }
    return 'left';
  }};
  text-decoration: none;
  @media ${mediaQueries.mobileL} {
    font-size: ${({
    styles,
    stylesMobile,
  }) => {
    if (stylesMobile && stylesMobile.fontSize) {
      return `${stylesMobile.fontSize}rem`;
    }
    if (styles && styles.fontSize) {
      return `${styles.fontSize}rem`;
    }
    return '1rem';
  }};
    line-height: ${({
    styles,
    stylesMobile,
  }) => {
    if (stylesMobile && stylesMobile.lineHeight) {
      const {
        lineHeight,
      } = stylesMobile;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    if (styles && styles.lineHeight) {
      const {
        lineHeight,
      } = styles;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    return 'normal';
  }};
    margin-bottom: ${({
    styles,
    stylesMobile,
  }) => {
    if (stylesMobile && stylesMobile.marginBottom) {
      return `${stylesMobile.marginBottom}px`;
    }
    if (styles && styles.marginBottom) {
      return `${styles.marginBottom}px`;
    }
    return '0px';
  }};
    margin-left: ${({
    styles,
    stylesMobile,
  }) => {
    if (stylesMobile && stylesMobile.marginLeft) {
      return `${stylesMobile.marginLeft}px`;
    }
    if (styles && styles.marginLeft) {
      return `${styles.marginLeft}px`;
    }
    return '0px';
  }};
    margin-right: ${({
    styles,
    stylesMobile,
  }) => {
    if (stylesMobile && stylesMobile.marginRight) {
      return `${stylesMobile.marginRight}px`;
    }
    if (styles && styles.marginRight) {
      return `${styles.marginRight}px`;
    }
    return '0px';
  }};
    margin-top: ${({
    styles,
    stylesMobile,
  }) => {
    if (stylesMobile && stylesMobile.marginTop) {
      return `${stylesMobile.marginTop}px`;
    }
    if (styles && styles.marginTop) {
      return `${styles.marginTop}px`;
    }
    return '0px';
  }};
    text-align: ${({
    styles,
    stylesMobile,
  }) => {
    if (stylesMobile && stylesMobile.textAlign) {
      return stylesMobile.textAlign;
    }
    if (styles && styles.textAlign) {
      return styles.textAlign;
    }
    return 'left';
  }}
  }
  @media ${mediaQueries.tablet} {
    font-size: ${({
    styles,
    stylesMobile,
    stylesTablet,
  }) => {
    if (stylesTablet && stylesTablet.fontSize) {
      return `${stylesTablet.fontSize}rem`;
    }
    if (stylesMobile && stylesMobile.fontSize) {
      return `${stylesMobile.fontSize}rem`;
    }
    if (styles && styles.fontSize) {
      return `${styles.fontSize}rem`;
    }
    return '1rem';
  }};
    line-height: ${({
    styles,
    stylesMobile,
    stylesTablet,
  }) => {
    if (stylesTablet && stylesTablet.lineHeight) {
      const {
        lineHeight,
      } = stylesTablet;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    if (stylesMobile && stylesMobile.lineHeight) {
      const {
        lineHeight,
      } = stylesMobile;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    if (styles && styles.lineHeight) {
      const {
        lineHeight,
      } = styles;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    return 'normal';
  }};
    margin-bottom: ${({
    styles,
    stylesMobile,
    stylesTablet,
  }) => {
    if (stylesTablet && stylesTablet.marginBottom) {
      return `${stylesTablet.marginBottom}px`;
    }
    if (stylesMobile && stylesMobile.marginBottom) {
      return `${stylesMobile.marginBottom}px`;
    }
    if (styles && styles.marginBottom) {
      return `${styles.marginBottom}px`;
    }
    return '0px';
  }};
    margin-left: ${({
    styles,
    stylesMobile,
    stylesTablet,
  }) => {
    if (stylesTablet && stylesTablet.marginLeft) {
      return `${stylesTablet.marginLeft}px`;
    }
    if (stylesMobile && stylesMobile.marginLeft) {
      return `${stylesMobile.marginLeft}px`;
    }
    if (styles && styles.marginLeft) {
      return `${styles.marginLeft}px`;
    }
    return '0px';
  }};
    margin-right: ${({
    styles,
    stylesMobile,
    stylesTablet,
  }) => {
    if (stylesTablet && stylesTablet.marginRight) {
      return `${stylesTablet.marginRight}px`;
    }
    if (stylesMobile && stylesMobile.marginRight) {
      return `${stylesMobile.marginRight}px`;
    }
    if (styles && styles.marginRight) {
      return `${styles.marginRight}px`;
    }
    return '0px';
  }};
    margin-top: ${({
    styles,
    stylesMobile,
    stylesTablet,
  }) => {
    if (stylesTablet && stylesTablet.marginTop) {
      return `${stylesTablet.marginTop}px`;
    }
    if (stylesMobile && stylesMobile.marginTop) {
      return `${stylesMobile.marginTop}px`;
    }
    if (styles && styles.marginTop) {
      return `${styles.marginTop}px`;
    }
    return '0px';
  }};
    text-align: ${({
    styles,
    stylesMobile,
    stylesTablet,
  }) => {
    if (stylesTablet && stylesTablet.textAlign) {
      return stylesTablet.textAlign;
    }
    if (stylesMobile && stylesMobile.textAlign) {
      return stylesMobile.textAlign;
    }
    if (styles && styles.fontSize) {
      return styles.textAlign;
    }
    return 'left';
  }}
  }
  @media ${mediaQueries.laptop} {
    font-size: ${({
    styles,
    stylesLaptop,
    stylesMobile,
    stylesTablet,
  }) => {
    if (stylesLaptop && stylesLaptop.fontSize) {
      return `${stylesLaptop.fontSize}rem`;
    }
    if (stylesTablet && stylesTablet.fontSize) {
      return `${stylesTablet.fontSize}rem`;
    }
    if (stylesMobile && stylesMobile.fontSize) {
      return `${stylesMobile.fontSize}rem`;
    }
    if (styles && styles.fontSize) {
      return `${styles.fontSize}rem`;
    }
    return '1rem';
  }};
    line-height: ${({
    styles,
    stylesLaptop,
    stylesMobile,
    stylesTablet,
  }) => {
    if (stylesLaptop && stylesLaptop.lineHeight) {
      const {
        lineHeight,
      } = stylesLaptop;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    if (stylesTablet && stylesTablet.lineHeight) {
      const {
        lineHeight,
      } = stylesTablet;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    if (stylesMobile && stylesMobile.lineHeight) {
      const {
        lineHeight,
      } = stylesMobile;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    if (styles && styles.lineHeight) {
      const {
        lineHeight,
      } = styles;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    return 'normal';
  }};
    margin-bottom: ${({
    styles,
    stylesMobile,
    stylesTablet,
    stylesLaptop,
  }) => {
    if (stylesLaptop && stylesLaptop.marginBottom) {
      return `${stylesLaptop.marginBottom}px`;
    }
    if (stylesTablet && stylesTablet.marginBottom) {
      return `${stylesTablet.marginBottom}px`;
    }
    if (stylesMobile && stylesMobile.marginBottom) {
      return `${stylesMobile.marginBottom}px`;
    }
    if (styles && styles.marginBottom) {
      return `${styles.marginBottom}px`;
    }
    return '0px';
  }};
    margin-left: ${({
    styles,
    stylesMobile,
    stylesTablet,
    stylesLaptop,
  }) => {
    if (stylesLaptop && stylesLaptop.marginLeft) {
      return `${stylesLaptop.marginLeft}px`;
    }
    if (stylesTablet && stylesTablet.marginLeft) {
      return `${stylesTablet.marginLeft}px`;
    }
    if (stylesMobile && stylesMobile.marginLeft) {
      return `${stylesMobile.marginLeft}px`;
    }
    if (styles && styles.marginLeft) {
      return `${styles.marginLeft}px`;
    }
    return '0px';
  }};
    margin-right: ${({
    styles,
    stylesMobile,
    stylesTablet,
    stylesLaptop,
  }) => {
    if (stylesLaptop && stylesLaptop.marginRight) {
      return `${stylesLaptop.marginRight}px`;
    }
    if (stylesTablet && stylesTablet.marginRight) {
      return `${stylesTablet.marginRight}px`;
    }
    if (stylesMobile && stylesMobile.marginRight) {
      return `${stylesMobile.marginRight}px`;
    }
    if (styles && styles.marginRight) {
      return `${styles.marginRight}px`;
    }
    return '0px';
  }};
    margin-top: ${({
    styles,
    stylesMobile,
    stylesTablet,
    stylesLaptop,
  }) => {
    if (stylesLaptop && stylesLaptop.marginTop) {
      return `${stylesLaptop.marginTop}px`;
    }
    if (stylesTablet && stylesTablet.marginTop) {
      return `${stylesTablet.marginTop}px`;
    }
    if (stylesMobile && stylesMobile.marginTop) {
      return `${stylesMobile.marginTop}px`;
    }
    if (styles && styles.marginTop) {
      return `${styles.marginTop}px`;
    }
    return '0px';
  }};
    text-align: ${({
    styles,
    stylesLaptop,
    stylesMobile,
    stylesTablet,
  }) => {
    if (stylesLaptop && stylesLaptop.textAlign) {
      return stylesLaptop.textAlign;
    }
    if (stylesTablet && stylesTablet.textAlign) {
      return stylesTablet.textAlign;
    }
    if (stylesMobile && stylesMobile.textAlign) {
      return stylesMobile.textAlign;
    }
    if (styles && styles.textAlign) {
      return styles.textAlign;
    }
    return 'left';
  }}
  }
  @media ${mediaQueries.laptopL} {
    font-size: ${({
    styles,
    stylesLaptop,
    stylesLaptopL,
    stylesMobile,
    stylesTablet,
  }) => {
    if (stylesLaptopL && stylesLaptopL.fontSize) {
      return `${stylesLaptopL.fontSize}rem`;
    }
    if (stylesLaptop && stylesLaptop.fontSize) {
      return `${stylesLaptop.fontSize}rem`;
    }
    if (stylesTablet && stylesTablet.fontSize) {
      return `${stylesTablet.fontSize}rem`;
    }
    if (stylesMobile && stylesMobile.fontSize) {
      return `${stylesMobile.fontSize}rem`;
    }
    if (styles && styles.fontSize) {
      return `${styles.fontSize}rem`;
    }
    return '1rem';
  }};
    line-height: ${({
    styles,
    stylesLaptop,
    stylesLaptopL,
    stylesMobile,
    stylesTablet,
  }) => {
    if (stylesLaptopL && stylesLaptopL.lineHeight) {
      const {
        lineHeight,
      } = stylesLaptopL;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    if (stylesLaptop && stylesLaptop.lineHeight) {
      const {
        lineHeight,
      } = stylesLaptop;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    if (stylesTablet && stylesTablet.lineHeight) {
      const {
        lineHeight,
      } = stylesTablet;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    if (stylesMobile && stylesMobile.lineHeight) {
      const {
        lineHeight,
      } = stylesMobile;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    if (styles && styles.lineHeight) {
      const {
        lineHeight,
      } = styles;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    return 'normal';
  }};
    margin-bottom: ${({
    styles,
    stylesMobile,
    stylesTablet,
    stylesLaptop,
    stylesLaptopL,
  }) => {
    if (stylesLaptopL && stylesLaptopL.marginBottom) {
      return `${stylesLaptopL.marginBottom}px`;
    }
    if (stylesLaptop && stylesLaptop.marginBottom) {
      return `${stylesLaptop.marginBottom}px`;
    }
    if (stylesTablet && stylesTablet.marginBottom) {
      return `${stylesTablet.marginBottom}px`;
    }
    if (stylesMobile && stylesMobile.marginBottom) {
      return `${stylesMobile.marginBottom}px`;
    }
    if (styles && styles.marginBottom) {
      return `${styles.marginBottom}px`;
    }
    return '0px';
  }};
    margin-left: ${({
    styles,
    stylesMobile,
    stylesTablet,
    stylesLaptop,
    stylesLaptopL,
  }) => {
    if (stylesLaptopL && stylesLaptopL.marginLeft) {
      return `${stylesLaptopL.marginLeft}px`;
    }
    if (stylesLaptop && stylesLaptop.marginLeft) {
      return `${stylesLaptop.marginLeft}px`;
    }
    if (stylesTablet && stylesTablet.marginLeft) {
      return `${stylesTablet.marginLeft}px`;
    }
    if (stylesMobile && stylesMobile.marginLeft) {
      return `${stylesMobile.marginLeft}px`;
    }
    if (styles && styles.marginLeft) {
      return `${styles.marginLeft}px`;
    }
    return '0px';
  }};
    margin-right: ${({
    styles,
    stylesMobile,
    stylesTablet,
    stylesLaptop,
    stylesLaptopL,
  }) => {
    if (stylesLaptopL && stylesLaptopL.marginRight) {
      return `${stylesLaptopL.marginRight}px`;
    }
    if (stylesLaptop && stylesLaptop.marginRight) {
      return `${stylesLaptop.marginRight}px`;
    }
    if (stylesTablet && stylesTablet.marginRight) {
      return `${stylesTablet.marginRight}px`;
    }
    if (stylesMobile && stylesMobile.marginRight) {
      return `${stylesMobile.marginRight}px`;
    }
    if (styles && styles.marginRight) {
      return `${styles.marginRight}px`;
    }
    return '0px';
  }};
    margin-top: ${({
    styles,
    stylesMobile,
    stylesTablet,
    stylesLaptop,
    stylesLaptopL,
  }) => {
    if (stylesLaptopL && stylesLaptopL.marginTop) {
      return `${stylesLaptopL.marginTop}px`;
    }
    if (stylesLaptop && stylesLaptop.marginTop) {
      return `${stylesLaptop.marginTop}px`;
    }
    if (stylesTablet && stylesTablet.marginTop) {
      return `${stylesTablet.marginTop}px`;
    }
    if (stylesMobile && stylesMobile.marginTop) {
      return `${stylesMobile.marginTop}px`;
    }
    if (styles && styles.marginTop) {
      return `${styles.marginTop}px`;
    }
    return '0px';
  }};
    text-align: ${({
    styles,
    stylesLaptop,
    stylesLaptopL,
    stylesMobile,
    stylesTablet,
  }) => {
    if (stylesLaptopL && stylesLaptopL.textAlign) {
      return stylesLaptopL.textAlign;
    }
    if (stylesLaptop && stylesLaptop.textAlign) {
      return stylesLaptop.textAlign;
    }
    if (stylesTablet && stylesTablet.textAlign) {
      return stylesTablet.textAlign;
    }
    if (stylesMobile && stylesMobile.textAlign) {
      return stylesMobile.textAlign;
    }
    if (styles && styles.textAlign) {
      return styles.textAlign;
    }
    return 'left';
  }}
  }
`;

P.defaultProps = {
  color: 'black',
  fontStyle: 'normal',
  fontWeight: 'normal',
  styles: {
    fontSize: 1,
    lineHeight: 1,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    textAlign: 'left',
  },
};

export default P;
