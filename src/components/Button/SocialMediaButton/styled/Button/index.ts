import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

type Variant = 'facebook' | 'google';

interface StylesI {
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
}

interface ButtonI {
  styles?: StylesI;
  stylesMobile?: StylesI;
  stylesTablet?: StylesI;
  stylesLaptop?: StylesI;
  stylesLaptopL?: StylesI;
  testId?: string;
  variant?: Variant;
}

const Button = styled.button.attrs<ButtonI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<ButtonI>`
  align-items: center;
  background-color: ${({
    theme,
    variant,
  }) => (
    variant === 'facebook'
      ? theme.colors.facebook
      : theme.colors.white
  )};
  border: ${({
    theme,
    variant,
  }) => (
    `1px solid ${
      variant === 'facebook'
        ? theme.colors.facebook
        : theme.colors.black
    }`
  )};
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  color: ${({
    variant,
    theme,
  }) => (
    variant === 'facebook'
      ? theme.colors.white
      : theme.colors.black
  )};
  cursor: pointer;
  display: flex;
  font-size: 0.85rem;
  height: 30px;
  justify-content: center;
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
  padding: 0 20px;
  & img {
    height: 16px;
  }
  @media ${mediaQueries.mobileL} {
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
    font-size: 1rem;
    height: 35px;
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

Button.defaultProps = {
  styles: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
  },
  variant: 'facebook',
};

export default Button;
