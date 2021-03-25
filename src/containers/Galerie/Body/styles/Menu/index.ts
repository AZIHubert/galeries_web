import styled from 'styled-components';

const Menu = styled.div`
  display: flex;
  border-bottom: ${({ theme }) => `2px solid ${theme.colors.primary}`};
  padding: 15px 0;
  justify-content: flex-end;
`;

export default Menu;
