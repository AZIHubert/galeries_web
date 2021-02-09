import styled from 'styled-components';

interface ButtonI {
  testId?: string;
}

const Button = styled.span.attrs<ButtonI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<ButtonI>`
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.black}`};
  cursor: pointer;
  display: inline;
`;

export default Button;
