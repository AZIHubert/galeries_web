import styled from 'styled-components';

interface InputI {
  disabled?: boolean;
  error?: boolean;
  testId?: string;
}

const Input = styled.input.attrs<InputI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<InputI>`
  background-color: ${({ theme }) => theme.colors.white};
  border: ${({
    error,
    theme,
  }) => `2px solid ${error ? theme.colors.danger : theme.colors.primary}`};
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 2px;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  padding: 5px 10px;
  transition: ${({ theme }) => `border-left ${theme.transition.default} ease-in-out`};
  width: 100%;
  &:focus {
    border-left: ${({
    error,
    theme,
  }) => `5px solid ${error ? theme.colors.danger : theme.colors.primary}`};
    outline: none;
  }
  &::selection {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.black};
  }
`;

Input.defaultProps = {
  error: false,
  disabled: false,
};

export default Input;
