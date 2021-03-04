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
  cursor: pointer;
  font-size: ${({ small }) => (small ? '0.6rem' : '1rem')};
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
  padding: ${({ small }) => (small ? '3px 10px' : '3px 15px')};
  transition: ${({ theme }) => (
    `background-color ${theme.transition.slow} ease-in,
    color ${theme.transition.default} ease-in:`
  )};
  &:focus {
    outline: none;
  }
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
    font-size: ${({ small }) => (small ? '0.8rem' : '1.1rem')};
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
    padding: ${({ small }) => (small ? '3px 10px' : '5px 15px')};
  }
  @media ${mediaQueries.laptopL} {
    border: ${({ theme }) => `3px solid ${theme.colors.primary}`};
    border-radius: ${({ small }) => (small ? '6px' : '8px')};
    font-size: ${({ small }) => (small ? '1rem' : '1.3rem')};
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
