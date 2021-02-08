import styled from 'styled-components';

type Variant = 'facebook' | 'google';

interface ButtonI {
  marginBottom?: number;
  marginTop?: number;
  variant?: Variant;
}

const Button = styled.button<ButtonI>`
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
  height: 34px;
  font-size: 0.9rem;
  justify-content: space-between;
  margin: ${({
    marginBottom,
    marginTop,
  }) => (
    `${marginTop}px 0 ${marginBottom}px 0`
  )};
  padding: 0 20px;
  -webkit-box-shadow: ${({ theme }) => theme.boxShadow};
  & img {
    height: 16px;
  }
`;

Button.defaultProps = {
  marginBottom: 0,
  marginTop: 0,
  variant: 'facebook',
};

export default Button;
