import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

type Variant = 'primary' | 'secondary';

interface StylesI {
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
}

interface ButtonI {
  small?: boolean;
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
  background-color: ${({
    theme,
    variant,
  }) => (
    variant === 'primary'
      ? theme.colors.primary
      : theme.colors.secondary
  )};
  border: ${({ theme }) => `2px solid ${theme.colors.primary}`};
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  color: ${({
    theme,
    variant,
  }) => (
    variant === 'primary'
      ? theme.colors.secondary
      : theme.colors.primary
  )};
  font-size: ${({ small }) => (small ? '0.6rem' : '1rem')};
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
  padding: ${({ small }) => (small ? '3px 10px' : '3px 15px')};
  transition: ${({ theme }) => (
    `background-color ${theme.transition.slow} ease-in,
    color ${theme.transition.default} ease-in:`
  )};
  &:hover {
    background-color: ${({
    theme,
    variant,
  }) => (
    variant === 'primary'
      ? theme.colors.secondary
      : theme.colors.primary
  )};
    color: ${({
    theme,
    variant,
  }) => (
    variant === 'primary'
      ? theme.colors.primary
      : theme.colors.secondary
  )};
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
    font-size: ${({ small }) => (small ? '0.8rem' : '1.1rem')};
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
    padding: ${({ small }) => (small ? '3px 10px' : '5px 15px')};
  }
  @media ${mediaQueries.laptopL} {
    border: ${({ theme }) => `3px solid ${theme.colors.primary}`};
    border-radius: ${({ small }) => (small ? '6px' : '8px')};
    font-size: ${({ small }) => (small ? '1rem' : '1.3rem')};
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
    padding: ${({ small }) => (small ? '3px 12px' : '5px 20px')};
  }
`;

Button.defaultProps = {
  styles: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
  },
  small: false,
  variant: 'primary',
};

export default Button;
