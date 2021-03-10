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
    if (styles && styles.justifyContent) {
      return styles.justifyContent;
    }
    return 'flex-start';
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
    if (stylesMobile && stylesMobile.justifyContent) {
      return stylesMobile.justifyContent;
    }
    if (styles && styles.justifyContent) {
      return styles.justifyContent;
    }
    return 'flex-start';
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
    if (stylesTablet && stylesTablet.justifyContent) {
      return stylesTablet.justifyContent;
    }
    if (stylesMobile && stylesMobile.justifyContent) {
      return stylesMobile.justifyContent;
    }
    if (styles && styles.justifyContent) {
      return styles.justifyContent;
    }
    return 'flex-start';
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
    if (stylesLaptop && stylesLaptop.justifyContent) {
      return stylesLaptop.justifyContent;
    }
    if (stylesTablet && stylesTablet.justifyContent) {
      return stylesTablet.justifyContent;
    }
    if (stylesMobile && stylesMobile.justifyContent) {
      return stylesMobile.justifyContent;
    }
    if (styles && styles.justifyContent) {
      return styles.justifyContent;
    }
    return 'flex-start';
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
    if (stylesLaptopL && stylesLaptopL.justifyContent) {
      return stylesLaptopL.justifyContent;
    }
    if (stylesLaptop && stylesLaptop.justifyContent) {
      return stylesLaptop.justifyContent;
    }
    if (stylesTablet && stylesTablet) {
      return stylesTablet.justifyContent;
    }
    if (stylesMobile && stylesMobile.justifyContent) {
      return stylesMobile.justifyContent;
    }
    if (styles && styles.justifyContent) {
      return styles.justifyContent;
    }
    return 'flex-start';
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
