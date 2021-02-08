import styled from 'styled-components';

const ForgotPassword = styled.div`
  color: ${({ theme }) => theme.colors.black};
  font-size: 0.8rem;
  border: none;
  cursor: pointer;
  display: inline-block;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.black}`};
`;

export default ForgotPassword;
