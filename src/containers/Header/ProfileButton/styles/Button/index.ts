import styled from 'styled-components';

const Button = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  border-left: ${({ theme }) => (
    `1px solid ${theme.colors.primary}`
  )};
  border-right: ${({ theme }) => (
    `1px solid ${theme.colors.primary}`
  )};
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  display: flex;
  font-size: 1.1rem;
  justify-content: center;
  margin-left: 40px;
  min-width: 200px;
  padding: 0 30px;
  &:focus {
    outline: none;
  }
`;

export default Button;
