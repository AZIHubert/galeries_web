import styled from 'styled-components';

interface ForgotPasswordI {
  testId?: string;
}

const ForgotPassword = styled.div.attrs<ForgotPasswordI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<ForgotPasswordI>`
  border: none;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.black}`};
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  display: inline-block;
  font-size: 0.8rem;
`;

export default ForgotPassword;
