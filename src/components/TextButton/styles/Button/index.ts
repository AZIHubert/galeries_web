import styled from 'styled-components';

const Button = styled.p`
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.black}`};
  cursor: pointer;
  display: inline;
`;

export default Button;
