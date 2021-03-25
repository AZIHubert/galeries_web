import styled from 'styled-components';

const Menu = styled.div`
  display: flex;
  border-bottom: ${({ theme }) => `2px solid ${theme.colors.primary}`};
  justify-content: flex-end;
  padding: 15px 20px;
`;

export default Menu;
