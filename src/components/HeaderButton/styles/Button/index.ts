import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

type Variant = 'primary' | 'secondary';

interface ButtonI {
  marginLeft?: number;
  marginRight?: number;
  variant?: Variant;
}

const Button = styled.button<ButtonI>`
  background-color: ${({ variant }) => (
    variant === 'primary'
      ? '#7483FF'
      : '#FFFFF4'
  )};
  border: ${({ theme }) => `2px solid ${theme.colors.primary}`};
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  color: ${({ variant }) => (
    variant === 'primary'
      ? '#FFFFF4'
      : '#7483FF'
  )};
  cursor: pointer;
  font-size: 1rem;
  margin: ${({
    marginLeft,
    marginRight,
  }) => (
    `0 ${marginRight}px 0 ${marginLeft}px`
  )};
  padding: 3px 15px;
  transition: ${({ theme }) => (
    `color ${theme.transition.default} ease-in,
    background-color ${theme.transition.slow} ease-in;`
  )};
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${(props) => (
    props.variant === 'primary'
      ? '#FFFFF4'
      : '#7483FF'
  )};
    color: ${(props) => (
    props.variant === 'primary'
      ? '#7483FF'
      : '#FFFFF4'
  )};
  }
  @media ${mediaQueries.laptop} {
    font-size: 1.1rem;
    padding: 5px 15px;
  }
  @media ${mediaQueries.laptopL} {
    border: ${({ theme }) => `3px solid ${theme.colors.primary}`};
    border-radius: 8px;
    font-size: 1.3rem;
    padding: 5px 20px;
  }
`;

Button.defaultProps = {
  marginLeft: 0,
  marginRight: 0,
  variant: 'primary',
};

export default Button;
