import styled from 'styled-components';

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
  border: 2px solid #7483FF;
  border-radius: 5px;
  color: ${({ variant }) => (
    variant === 'primary'
      ? '#FFFFF4'
      : '#7483FF'
  )};
  cursor: pointer;
  font-size: 1.1rem;
  margin: ${({
    marginLeft,
    marginRight,
  }) => (
    `0 ${marginRight}px 0 ${marginLeft}px`
  )};
  padding: 5px 15px;
  transition: ${({ theme }) => (
    `color ${theme.transition.default} ease-in, background-color ${theme.transition.slow} ease-in;`
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
`;

Button.defaultProps = {
  marginLeft: 0,
  marginRight: 0,
  variant: 'primary',
};

export default Button;
