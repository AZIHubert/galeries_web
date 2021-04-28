import styled from 'styled-components';

const Button = styled.button`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.1rem;
  transition: ${({ theme }) => theme.transition.default};
  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }
`;

export default Button;
