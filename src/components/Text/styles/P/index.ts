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
    if (styles) {
      const {
        lineHeight,
      } = styles;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    return 'normal';
  }};
  margin: ${({ styles }) => {
    if (styles) {
      const {
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
      } = styles;
      return `${marginTop || 0}px ${marginRight || 0}px ${marginBottom || 0}px ${marginLeft || 0}px`;
    }
    return 0;
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
    if (stylesMobile) {
      const {
        lineHeight,
      } = stylesMobile;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    if (styles) {
      const {
        lineHeight,
      } = styles;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    return 'normal';
  }};
    margin: ${({
    styles,
    stylesMobile,
  }) => {
    if (stylesMobile) {
      const {
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
      } = stylesMobile;
      return `${marginTop || 0}px ${marginRight || 0}px ${marginBottom || 0}px ${marginLeft || 0}px`;
    }
    if (styles) {
      const {
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
      } = styles;
      return `${marginTop || 0}px ${marginRight || 0}px ${marginBottom || 0}px ${marginLeft || 0}px`;
    }
    return 0;
  }};
    text-align: ${({
    styles,
    stylesMobile,
  }) => {
    if (stylesMobile && stylesMobile.textAlign) {
      return stylesMobile.textAlign;
    }
    if (styles && styles.fontSize) {
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
    if (stylesTablet) {
      const {
        lineHeight,
      } = stylesTablet;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    if (stylesMobile) {
      const {
        lineHeight,
      } = stylesMobile;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    if (styles) {
      const {
        lineHeight,
      } = styles;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    return 'normal';
  }};
    margin: ${({
    styles,
    stylesMobile,
    stylesTablet,
  }) => {
    if (stylesTablet) {
      const {
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
      } = stylesTablet;
      return `${marginTop || 0}px ${marginRight || 0}px ${marginBottom || 0}px ${marginLeft || 0}px`;
    }
    if (stylesMobile) {
      const {
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
      } = stylesMobile;
      return `${marginTop || 0}px ${marginRight || 0}px ${marginBottom || 0}px ${marginLeft || 0}px`;
    }
    if (styles) {
      const {
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
      } = styles;
      return `${marginTop || 0}px ${marginRight || 0}px ${marginBottom || 0}px ${marginLeft || 0}px`;
    }
    return 0;
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
    if (stylesLaptop) {
      const {
        lineHeight,
      } = stylesLaptop;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    if (stylesTablet) {
      const {
        lineHeight,
      } = stylesTablet;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    if (stylesMobile) {
      const {
        lineHeight,
      } = stylesMobile;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    if (styles) {
      const {
        lineHeight,
      } = styles;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    return 'normal';
  }};
    margin: ${({
    styles,
    stylesLaptop,
    stylesMobile,
    stylesTablet,
  }) => {
    if (stylesLaptop) {
      const {
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
      } = stylesLaptop;
      return `${marginTop || 0}px ${marginRight || 0}px ${marginBottom || 0}px ${marginLeft || 0}px`;
    }
    if (stylesTablet) {
      const {
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
      } = stylesTablet;
      return `${marginTop || 0}px ${marginRight || 0}px ${marginBottom || 0}px ${marginLeft || 0}px`;
    }
    if (stylesMobile) {
      const {
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
      } = stylesMobile;
      return `${marginTop || 0}px ${marginRight || 0}px ${marginBottom || 0}px ${marginLeft || 0}px`;
    }
    if (styles) {
      const {
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
      } = styles;
      return `${marginTop || 0}px ${marginRight || 0}px ${marginBottom || 0}px ${marginLeft || 0}px`;
    }
    return 0;
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
    if (styles && styles.fontSize) {
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
    if (stylesLaptopL) {
      const {
        lineHeight,
      } = stylesLaptopL;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    if (stylesLaptop) {
      const {
        lineHeight,
      } = stylesLaptop;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    if (stylesTablet) {
      const {
        lineHeight,
      } = stylesTablet;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    if (stylesMobile) {
      const {
        lineHeight,
      } = stylesMobile;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    if (styles) {
      const {
        lineHeight,
      } = styles;
      return `${lineHeight ? `${lineHeight}rem` : 'normal'}`;
    }
    return 'normal';
  }};
    margin: ${({
    styles,
    stylesLaptop,
    stylesLaptopL,
    stylesMobile,
    stylesTablet,
  }) => {
    if (stylesLaptopL) {
      const {
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
      } = stylesLaptopL;
      return `${marginTop || 0}px ${marginRight || 0}px ${marginBottom || 0}px ${marginLeft || 0}px`;
    }
    if (stylesLaptop) {
      const {
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
      } = stylesLaptop;
      return `${marginTop || 0}px ${marginRight || 0}px ${marginBottom || 0}px ${marginLeft || 0}px`;
    }
    if (stylesTablet) {
      const {
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
      } = stylesTablet;
      return `${marginTop || 0}px ${marginRight || 0}px ${marginBottom || 0}px ${marginLeft || 0}px`;
    }
    if (stylesMobile) {
      const {
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
      } = stylesMobile;
      return `${marginTop || 0}px ${marginRight || 0}px ${marginBottom || 0}px ${marginLeft || 0}px`;
    }
    if (styles) {
      const {
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
      } = styles;
      return `${marginTop || 0}px ${marginRight || 0}px ${marginBottom || 0}px ${marginLeft || 0}px`;
    }
    return 0;
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
    if (styles && styles.fontSize) {
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
