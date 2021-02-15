import styled from 'styled-components';

interface ButtonI {
  borderBottom?: boolean;
}

const Button = styled.button<ButtonI>`
  align-items: center;
  background-color: transparent;
  border: none;
  border-bottom: ${({
    borderBottom,
    theme,
  }) => (
    borderBottom && `1px solid ${theme.colors.primary}`
  )};
  display: flex;
  cursor: pointer;
  height: 70px;
  padding: 12px 5px;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

Button.defaultProps = {
  borderBottom: false,
};

export default Button;
