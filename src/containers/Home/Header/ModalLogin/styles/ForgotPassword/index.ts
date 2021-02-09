import styled from 'styled-components';

interface ForgotPasswordI {
  testId?: string;
}

const ForgotPassword = styled.div.attrs<ForgotPasswordI>(
  ({ testId }) => ({
    'data-testid': testId,
  }),
)<ForgotPasswordI>`
  color: ${({ theme }) => theme.colors.black};
  font-size: 0.8rem;
  border: none;
  cursor: pointer;
  display: inline-block;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.black}`};
`;

export default ForgotPassword;
