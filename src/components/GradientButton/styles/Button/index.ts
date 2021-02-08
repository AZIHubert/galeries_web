import styled from 'styled-components';

interface ButtonI {
  marginBottom?: number;
  marginTop?: number;
}

const Button = styled.button<ButtonI>`
  background-image: ${({ theme }) => (
    `linear-gradient(90deg, ${theme.colors.tertiary} 0%, ${theme.colors.primary} 50%)`
  )};
  background-size: 200%;
  border: none;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  font-size: 1rem;
  height: 32px;
  margin: ${({ marginBottom, marginTop }) => (
    `${marginTop}px 0 ${marginBottom}px`
  )};
  padding: 0 10px;
  text-transform: capitalize;
  transition: ${({ theme }) => `background-position ${theme.transition.default} ease-in`};
  width: 100%;
  -webkit-box-shadow: ${({ theme }) => theme.boxShadow};
  &:focus {
    outline: none;
  }
  &:hover {
    background-position: right;
  }
`;

Button.defaultProps = {
  marginBottom: 0,
  marginTop: 0,
};

export default Button;
