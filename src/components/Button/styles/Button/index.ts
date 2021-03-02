import styled from 'styled-components';

import mediaQueries from '#helpers/mediaQueries';

type Variant = 'primary' | 'secondary';

interface ButtonI {
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  small?: boolean;
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
  border-radius: 3px;
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
  font-size: ${({ small }) => (small ? '0.6rem' : '0.9rem')};
  margin: ${({
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
  }) => (
    `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`
  )};
  padding: ${({ small }) => (small ? '2px 8px' : '1px 12px')};
  transition: ${({ theme }) => (
    `color ${theme.transition.default} ease-in,
    background-color ${theme.transition.slow} ease-in;`
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
  @media ${mediaQueries.laptop} {
    font-size: ${({ small }) => (small ? '0.7rem' : '0.9rem')};
    padding: ${({ small }) => (small ? '1px 10px' : '3px 12px')};
  }
  @media ${mediaQueries.laptopL} {
    font-size: ${({ small }) => (small ? '1rem' : '1rem')};
    padding: ${({ small }) => (small ? '1px 10px' : '5px 15px')};
  }
`;

Button.defaultProps = {
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  small: false,
  variant: 'primary',
};

export default Button;
