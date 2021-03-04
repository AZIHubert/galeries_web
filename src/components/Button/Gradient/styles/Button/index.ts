import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface StylesI {
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
}

interface ButtonI {
  disabled?: boolean;
  styles?: StylesI;
  stylesMobile?: StylesI;
  stylesTablet?: StylesI;
  stylesLaptop?: StylesI;
  stylesLaptopL?: StylesI;
  testId?: string;
}

const Button = styled.button.attrs<ButtonI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<ButtonI>`
  background-image: ${({ theme }) => (
    `linear-gradient(90deg, ${theme.colors.tertiary} 0%, ${theme.colors.primary} 50%)`
  )};
  background-size: 200%;
  background-position: ${({ disabled }) => (`${disabled} ? left : right`)};
  border: none;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  font-size: 0.9rem;
  height: 29px;
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
  padding: 0 10px;
  text-transform: capitalize;
  transition: ${({ theme }) => `background-position ${theme.transition.default} ease-in`};
  width: 100%;
  &:focus {
    outline: none;
  }
  &:hover {
    background-position: right;
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
    font-size: 1rem;
    height: 35px;
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

Button.defaultProps = {
  styles: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
  },
};

export default Button;
