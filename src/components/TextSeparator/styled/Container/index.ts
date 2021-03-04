import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

interface StylesI {
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
}

const Container = styled.p<ContainerI>`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.1rem;
  font-style: italic;
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
  overflow: hidden;
  text-align: center;
  &::before {
    margin-left: -50%;
    right: 1.3em;
  }
  &::after {
    left: 1.3em;
    margin-right: -50%;
  }
  &::before, &::after {
    background-color: ${({ theme }) => theme.colors.primary};
    content: "";
    display: inline-block;
    height: 1px;
    position: relative;
    vertical-align: middle;
    width: 50%;
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
    font-size: 1.3rem;
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
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
  },
};

export default Container;
