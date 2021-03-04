import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface StylesI {
  fontSize?: number;
  justifyContent?: style.JustifyContent;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
}

interface ContainerI {
  styles?: StylesI;
  stylesMobile?: StylesI;
  stylesTablet?: StylesI;
  stylesLaptop?: StylesI;
  stylesLaptopL?: StylesI;
  testId?: string;
}

const Container = styled.div.attrs<ContainerI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<ContainerI>`
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  font-size: ${({ styles }) => {
    if (styles && styles.fontSize) {
      return `${styles.fontSize}rem`;
    }
    return '1rem';
  }};
  justify-content: ${({ styles }) => {
    if (styles) {
      const {
        justifyContent,
      } = styles;
      return justifyContent || 'flex-start';
    }
    return 'flex-start';
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
    justify-content: ${({
    styles,
    stylesMobile,
  }) => {
    if (stylesMobile) {
      const {
        justifyContent,
      } = stylesMobile;
      return justifyContent || 'flex-start';
    }
    if (styles) {
      const {
        justifyContent,
      } = styles;
      return justifyContent || 'flex-start';
    }
    return 'flex-start';
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
    justify-content: ${({
    styles,
    stylesMobile,
    stylesTablet,
  }) => {
    if (stylesTablet) {
      const {
        justifyContent,
      } = stylesTablet;
      return justifyContent || 'flex-start';
    }
    if (stylesMobile) {
      const {
        justifyContent,
      } = stylesMobile;
      return justifyContent || 'flex-start';
    }
    if (styles) {
      const {
        justifyContent,
      } = styles;
      return justifyContent || 'flex-start';
    }
    return 'flex-start';
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
    justify-content: ${({
    styles,
    stylesLaptop,
    stylesMobile,
    stylesTablet,
  }) => {
    if (stylesLaptop) {
      const {
        justifyContent,
      } = stylesLaptop;
      return justifyContent || 'flex-start';
    }
    if (stylesTablet) {
      const {
        justifyContent,
      } = stylesTablet;
      return justifyContent || 'flex-start';
    }
    if (stylesMobile) {
      const {
        justifyContent,
      } = stylesMobile;
      return justifyContent || 'flex-start';
    }
    if (styles) {
      const {
        justifyContent,
      } = styles;
      return justifyContent || 'flex-start';
    }
    return 'flex-start';
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
    justify-content: ${({
    styles,
    stylesLaptop,
    stylesLaptopL,
    stylesMobile,
    stylesTablet,
  }) => {
    if (stylesLaptopL) {
      const {
        justifyContent,
      } = stylesLaptopL;
      return justifyContent || 'flex-start';
    }
    if (stylesLaptop) {
      const {
        justifyContent,
      } = stylesLaptop;
      return justifyContent || 'flex-start';
    }
    if (stylesTablet) {
      const {
        justifyContent,
      } = stylesTablet;
      return justifyContent || 'flex-start';
    }
    if (stylesMobile) {
      const {
        justifyContent,
      } = stylesMobile;
      return justifyContent || 'flex-start';
    }
    if (styles) {
      const {
        justifyContent,
      } = styles;
      return justifyContent || 'flex-start';
    }
    return 'flex-start';
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
  }
`;

Container.defaultProps = {
  styles: {
    fontSize: 1,
    justifyContent: 'flex-start',
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
  },
};

export default Container;
